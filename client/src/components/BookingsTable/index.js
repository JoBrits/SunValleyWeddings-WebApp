import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
// Styles
import classNames from "classnames";
import styles from "./BookingsTable.module.scss";

// Components
import Spinner from "../../components/Spinner";

// Hooks
import { useBookingContext } from "../../hooks/useBookingContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const BookingsTable = ({ view }) => {
  // fetch user from useAuthContext
  const { user } = useAuthContext();

  const { bookings, dispatch } = useBookingContext();
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Error, Empty and Character Limit fields fields returned from backend
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [characterLimitFields, setCharacterLimitFields] = useState([]);

  // State to store new guest input data
  const [newBookingForm, setNewBookingForm] = useState(false);

  // Initialize useNavigate
  const navigate = useNavigate();

  // Handle input change for editing
  const handleInputChange = (e, field) => {
    setEditData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Format time correctly function
  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    setEditData((prev) => ({
      ...prev,
      eventTime: {
        ...prev.eventTime,
        [name]: value.padStart(2, "0"), // Ensure formatting
      },
    }));
  };

  // Handle edit button click
  const handleEdit = (booking) => {
    // split hours and minutes
    const [splitHours, splitMinutes] = booking.eventTime
      .split(" : ")
      .map((val) => val.trim());

    setEditingId(booking._id);
    setEditData({
      title: booking.title || "",
      name: booking.name || "",
      surname: booking.surname || "",
      email: booking.email || "",
      eventDate: booking.eventDate || "",
      eventTime: {
        hours: splitHours,
        minutes: splitMinutes,
      },
      eventGuests: booking.eventGuests || 0,
      eventNote: booking.eventNote || "",
      status: booking.status || "pending",
    });
  };
  // Handle save edit booking
  const handleSaveEdit = async (id) => {
    try {
      // Ensure time format is updated correctly
      const updatedData = {
        ...editData,
        eventTime: `${editData.eventTime.hours} : ${editData.eventTime.minutes}`,
      };

      const response = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedBooking = await response.json();

        // Dispatch update action to context
        dispatch({ type: "UPDATE_BOOKING", payload: updatedBooking });

        // Refetch bookings to ensure table updates
        fetchBookings();

        // Reset editing state
        setEditingId(null);
        setEditData({});
        handleCancelEdit();
        navigate("/admin/bookings/");
      } else {
        console.error("Failed to update booking:", await response.json());
      }
    } catch (error) {
      console.error("Failed to update booking:", error);
    }
  };
  // Handle cancel edit booking
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };
  // Handle delete booking
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        dispatch({ type: "DELETE_BOOKING", payload: { _id: id } });
        fetchBookings();
      } else {
        console.error("Failed to delete booking:", await response.json());
      }
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  // Function to display form for a new guest
  const handleAddBookingForm = () => {
    setNewBookingForm(true);
  };
  const handleAddBookingFormCancel = () => {
    setNewBookingForm(false);
  };
  // Function to add a new guest
  const handleSaveBookingForm = async () => {
    console.log(editData.eventTime);

    // Convert time back to a string before submitting to backend
    if (!editData.eventTime) {
      editData.eventTime = "00 : 00";
    } else {
      const hours = editData.eventTime.hours || "00";
      const minutes = editData.eventTime.minutes || "00";
      editData.eventTime = `${hours} : ${minutes}`;
    }

    try {
      // Create new booking
      const response = await fetch("/api/bookings/", {
        method: "POST",
        body: JSON.stringify(editData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error); // return error message from backend/mongoose
        console.log("error = " + json.error);

        if (json.setCharacterLimitFields) {
          setCharacterLimitFields(json.setCharacterLimitFields); // set Character Limit fields returned from backend
          console.log("characterLimitFields = " + characterLimitFields);
        }

        if (json.emptyFields) {
          setEmptyFields(json.emptyFields); // set empty fields returned from backend
          console.log("emptyFields = " + emptyFields);
        }
      }

      if (response.ok) {
        // Dispatch Booking State
        dispatch({ type: "CREATE_BOOKING", payload: json });

        // Reset the input fields
        setEditData({
          title: "",
          name: "",
          surname: "",
          email: "",
          eventID: "",
          eventDate: "",
          eventTime: {
            hours: "",
            minutes: "",
          },
          eventGuests: "",
          eventNote: "",
          status: "pending",
        });
        setNewBookingForm(false);
        fetchBookings();
        navigate("/admin/bookings/");
      }
    } catch (error) {
      console.error("Failed to add booking:", error);
    }
  };

  // Fetch bookings when component mounts
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/bookings/bookings");
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_BOOKINGS", payload: data });
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <div className={classNames(styles["bookings-table"])}>
          <table>
            <thead>
              <tr>
                <th width="10%">Title</th>
                <th width="10%">Name</th>
                <th width="10%">Surname</th>
                <th width="10%">Email</th>
                <th width="10%">Event Date</th>
                <th width="10%">Event Time</th>
                <th width="10%">Guests</th>
                <th width="10%">Notes</th>
                <th width="10%">Status</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* use conditional view as filter from url */}
              <>
                {bookings
                  // conditionals to return all for admin or specific for user
                  .filter((booking) => {
                    // All Bookings
                    if (view === "All")
                      if (user.role === "admin") {
                        return true;
                      } else {
                        return booking.email === user.email;
                      }

                    // All Pending Bookings
                    if (view === "Pending") {
                      if (user.role === "admin") {
                        return booking.status === "pending";
                      } else {
                        return (
                          booking.email === user.email &&
                          booking.status === "pending"
                        );
                      }
                    }

                    // All Confirmed Bookings
                    if (view === "Confirmed") {
                      if (user.role === "admin") {
                        return booking.status === "confirmed";
                      } else {
                        return (
                          booking.email === user.email &&
                          booking.status === "confirmed"
                        );
                      }
                    }

                    // Filter by booking ID
                    return booking._id === view;
                  })
                  .map((booking) => (
                    <tr
                      key={booking._id}
                      className={classNames(styles["bookings-table-tr"])}
                    >
                      {/* Editing an existing booking */}
                      {editingId === booking._id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              value={editData.title}
                              onChange={(e) => handleInputChange(e, "title")}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={editData.name}
                              onChange={(e) => handleInputChange(e, "name")}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={editData.surname}
                              onChange={(e) => handleInputChange(e, "surname")}
                            />
                          </td>
                          <td>
                            <input
                              type="email"
                              value={editData.email}
                              onChange={(e) => handleInputChange(e, "email")}
                              disabled={user.role === "user"}
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              value={
                                editData.eventDate
                                  ? editData.eventDate.split("T")[0]
                                  : ""
                              }
                              onChange={(e) =>
                                handleInputChange(e, "eventDate")
                              }
                            />
                          </td>
                          <td>
                            <div className={classNames(styles["time-input"])}>
                              <input
                                type="number"
                                name="hours"
                                min={0}
                                max={24}
                                className={classNames(styles["hours"])}
                                value={editData.eventTime?.hours || "00"}
                                onChange={handleTimeChange}
                              />
                              <p>:</p>
                              <input
                                type="number"
                                name="minutes"
                                min={0}
                                max={60}
                                className={classNames(styles["minutes"])}
                                value={editData.eventTime?.minutes || "00"}
                                onChange={handleTimeChange}
                              />
                            </div>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={editData.eventGuests}
                              onChange={(e) =>
                                handleInputChange(e, "eventGuests")
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={editData.eventNote}
                              onChange={(e) =>
                                handleInputChange(e, "eventNote")
                              }
                            />
                          </td>
                          <td>
                            <select
                              value={editData.status}
                              onChange={(e) => handleInputChange(e, "status")}
                              disabled={user.role === "user"} // only admin can approve
                            >
                              <option value="">Please select</option>
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                            </select>
                          </td>
                          <td>
                            <div
                              className={classNames(
                                styles["bookings-table-buttons"]
                              )}
                            >
                              <button
                                onClick={() => handleSaveEdit(booking._id)}
                              >
                                Save
                              </button>
                              <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                          </td>
                        </>
                      ) : (
                        // View existing booking
                        <>
                          <td>{booking.title}</td>
                          <td>{booking.name}</td>
                          <td>{booking.surname}</td>
                          <td>{booking.email}</td>
                          <td>
                            {new Date(booking.eventDate).toLocaleDateString()}
                          </td>
                          <td>{booking.eventTime}</td>
                          <td>{booking.eventGuests}</td>
                          <td>{booking.eventNote}</td>
                          <td>{booking.status}</td>
                          <td>
                            <div
                              className={classNames(
                                styles["bookings-table-buttons"]
                              )}
                            >
                              <button onClick={() => handleEdit(booking)}>
                                Edit
                              </button>
                              <button onClick={() => handleDelete(booking._id)}>
                                Delete
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
              </>
              <tr>
                <td
                  colSpan={10}
                  className={classNames(styles["bookings-table-tr-spacer"])}
                ></td>
              </tr>

              {newBookingForm === true ? (
                <tr>
                  <td>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => handleInputChange(e, "title")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleInputChange(e, "name")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData.surname}
                      onChange={(e) => handleInputChange(e, "surname")}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange(e, "email")}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={
                        editData.eventDate
                          ? editData.eventDate.split("T")[0]
                          : ""
                      }
                      onChange={(e) => handleInputChange(e, "eventDate")}
                    />
                  </td>
                  <td>
                    <div className={classNames(styles["time-input"])}>
                      <input
                        type="number"
                        name="hours"
                        min={0}
                        max={24}
                        className={classNames(styles["hours"])}
                        value={
                          editData.eventTime?.hours
                            ? editData.eventTime.hours
                            : "00"
                        } // Default value
                        onChange={handleTimeChange}
                      />
                      <p>:</p>
                      <input
                        type="number"
                        name="minutes"
                        min={0}
                        max={60}
                        className={classNames(styles["minutes"])}
                        value={
                          editData.eventTime?.minutes
                            ? editData.eventTime.minutes
                            : "00"
                        } // Default value
                        onChange={handleTimeChange}
                      />
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="eventGuests"
                      value={editData.eventGuests}
                      onChange={(e) => handleInputChange(e, "eventGuests")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="eventNote"
                      value={editData.eventNote}
                      onChange={(e) => handleInputChange(e, "eventNote")}
                    />
                  </td>
                  <td>
                    <select
                      value={editData.status}
                      onChange={(e) => handleInputChange(e, "status")}
                      disabled={user.role === "user"}
                    >
                      <option value="">Please</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  </td>
                  <td>
                    {/* Highlight Error */}
                    {error && <div className="error">{error}</div>}
                    <div
                      className={classNames(styles["bookings-table-buttons"])}
                    >
                      <button onClick={() => handleSaveBookingForm()}>
                        Save
                      </button>
                      <button onClick={handleAddBookingFormCancel}>
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={10}>
                    <div
                      className={classNames(styles["bookings-table-buttons"])}
                    >
                      {/*handleAddBookingForm sets newBookingForm to true  */}
                      <button onClick={handleAddBookingForm}>
                        Add a new booking
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default BookingsTable;
