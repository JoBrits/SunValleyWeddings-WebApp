import { useEffect, useState } from "react";
import { useBookingContext } from "../../hooks/useBookingContext";

// Styles
import classNames from "classnames";
import styles from "./BookingsTable.module.scss";

// Components
import Spinner from "../../components/Spinner";

const BookingsTable = ({ view }) => {
  const { bookings, pendingBookings, confirmedBookings, dispatch } =
    useBookingContext();
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Error, Empty and Character Limit fields fields returned from backend
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [characterLimitFields, setCharacterLimitFields] = useState([]);

  // State to store new guest input data
  const [newBookingForm, setNewBookingForm] = useState(false);

  // Fetch bookings when component mounts
  useEffect(() => {
    const fetchBookings = async () => {
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
    };
    fetchBookings();
  }, [dispatch]); //This ensures the table updates after every edit

  // Handle input change for editing
  const handleInputChange = (e, field) => {
    setEditData((prev) => ({ ...prev, [field]: e.target.value }));
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

  const handleSave = async (id) => {
    try {
      // Convert time back to a string before submitting to backend
      editData.eventTime =
        editData.eventTime.hours + " : " + editData.eventTime.minutes;

      const response = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        const updatedBooking = await response.json();

        // Dispatch update action to context
        dispatch({ type: "UPDATE_BOOKING", payload: updatedBooking });

        // Reset editing state
        setEditingId(null);
        setEditData({});
      } else {
        console.error("Failed to update booking:", await response.json());
      }
    } catch (error) {
      console.error("Failed to update booking:", error);
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
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
  const handleAddBooking = async () => {
    // Convert time back to a string before submitting to backend
    editData.eventTime =
      editData.eventTime.hours + " : " + editData.eventTime.minutes;
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
          eventDate: "",
          eventTime: {
            hours: "",
            minutes: "",
          },
          eventGuests: "",
          eventNote: "",
          status: "pending",
        });
      }
    } catch (error) {
      console.error("Failed to add booking:", error);
    }
  };

  // Format time correctly function
  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    console.log("name:", name);
    console.log("value:", value);

    setEditData((prev) => ({
      ...prev,
      eventTime: {
        ...prev.eventTime,
        [name]: value.padStart(2, "0"), // Ensure formatting
      },
    }));

    console.log("editData:", editData);
  };

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <div className={classNames(styles["bookings-table"])}>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Name</th>
                <th>Email</th>
                <th>Event Date</th>
                <th>Event Time</th>
                <th>Guests</th>
                <th>Notes</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <>
                {view === "pending" && (
                  <>
                    {pendingBookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className={classNames(styles["bookings-table-tr"])}
                      >
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
                              <div className={classNames(styles["time-input"])}>
                                <input
                                  type="text"
                                  value={editData.name}
                                  onChange={(e) => handleInputChange(e, "name")}
                                />
                                <input
                                  type="text"
                                  value={editData.surname}
                                  onChange={(e) =>
                                    handleInputChange(e, "surname")
                                  }
                                />
                              </div>
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
                                  value={editData.eventTime?.hours || "00"} // Default value
                                  onChange={handleTimeChange}
                                />
                                <p>:</p>
                                <input
                                  type="number"
                                  name="minutes"
                                  min={0}
                                  max={60}
                                  className={classNames(styles["minutes"])}
                                  value={editData.eventTime?.minutes || "00"} // Default value
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
                              >
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
                                <button onClick={() => handleSave(booking._id)}>
                                  Save
                                </button>
                                <button onClick={handleCancel}>Cancel</button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{booking.title}</td>
                            <td>{`${booking.name} ${booking.surname}`}</td>
                            <td>{booking.email}</td>
                            <td>
                              {new Date(booking.eventDate).toLocaleDateString()}
                            </td>
                            <td>{booking.eventTime}</td>
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
                                <button
                                  onClick={() => handleDelete(booking._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </>
                )}
                {view === "confirmed" && (
                  <>
                    {confirmedBookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className={classNames(styles["bookings-table-tr"])}
                      >
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
                              <div className={classNames(styles["time-input"])}>
                                <input
                                  type="text"
                                  value={editData.name}
                                  onChange={(e) => handleInputChange(e, "name")}
                                />
                                <input
                                  type="text"
                                  value={editData.surname}
                                  onChange={(e) =>
                                    handleInputChange(e, "surname")
                                  }
                                />
                              </div>
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
                                  value={editData.eventTime?.hours || "00"} // Default value
                                  onChange={handleTimeChange}
                                />
                                <p>:</p>
                                <input
                                  type="number"
                                  name="minutes"
                                  min={0}
                                  max={60}
                                  className={classNames(styles["minutes"])}
                                  value={editData.eventTime?.minutes || "00"} // Default value
                                  onChange={handleTimeChange}
                                />
                              </div>
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
                              >
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
                                <button onClick={() => handleSave(booking._id)}>
                                  Save
                                </button>
                                <button onClick={handleCancel}>Cancel</button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{booking.title}</td>
                            <td>{`${booking.name} ${booking.surname}`}</td>
                            <td>{booking.email}</td>
                            <td>
                              {new Date(booking.eventDate).toLocaleDateString()}
                            </td>
                            <td>{booking.eventTime}</td>
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
                                <button
                                  onClick={() => handleDelete(booking._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </>
                )}
                {view === "all" && (
                  <>
                    {bookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className={classNames(styles["bookings-table-tr"])}
                      >
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
                              <div className={classNames(styles["time-input"])}>
                                <input
                                  type="text"
                                  value={editData.name}
                                  onChange={(e) => handleInputChange(e, "name")}
                                />
                                <input
                                  type="text"
                                  value={editData.surname}
                                  onChange={(e) =>
                                    handleInputChange(e, "surname")
                                  }
                                />
                              </div>
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
                                  value={editData.eventTime?.hours || "00"} // Default value
                                  onChange={handleTimeChange}
                                />
                                <p>:</p>
                                <input
                                  type="number"
                                  name="minutes"
                                  min={0}
                                  max={60}
                                  className={classNames(styles["minutes"])}
                                  value={editData.eventTime?.minutes || "00"} // Default value
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
                              >
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
                                <button onClick={() => handleSave(booking._id)}>
                                  Save
                                </button>
                                <button onClick={handleCancel}>Cancel</button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{booking.title}</td>
                            <td>{`${booking.name} ${booking.surname}`}</td>
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
                                <button
                                  onClick={() => handleDelete(booking._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </>
                )}
              </>
              <tr>
                <td
                  colSpan={9}
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
                    <div className={classNames(styles["time-input"])}>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => handleInputChange(e, "name")}
                      />
                      <input
                        type="text"
                        value={editData.surname}
                        onChange={(e) => handleInputChange(e, "surname")}
                      />
                    </div>
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
                        value={editData.eventTime?.hours || "00"} // Default value
                        onChange={handleTimeChange}
                      />
                      <p>:</p>
                      <input
                        type="number"
                        name="minutes"
                        min={0}
                        max={60}
                        className={classNames(styles["minutes"])}
                        value={editData.eventTime?.minutes || "00"} // Default value
                        onChange={handleTimeChange}
                      />
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData.eventNote}
                      onChange={(e) => handleInputChange(e, "eventNote")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData.eventGuests}
                      onChange={(e) => handleInputChange(e, "eventGuests")}
                    />
                  </td>
                  <td>
                    <select
                      value={editData.status}
                      onChange={(e) => handleInputChange(e, "status")}
                    >
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
                      <button onClick={() => handleAddBooking()}>Save</button>
                      <button onClick={handleAddBookingFormCancel}>
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={9}>
                    <div
                      className={classNames(styles["bookings-table-buttons"])}
                    >
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
