import { useEffect, useState } from "react";
import { useBookingContext } from "../../hooks/useBookingContext";

// Styles
import classNames from "classnames";
import styles from "./BookingsTable.module.scss";

const BookingsTable = () => {
  const { bookings, dispatch } = useBookingContext();

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch bookings when component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings/bookings");
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_BOOKINGS", payload: data });
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, [bookings, dispatch]); //This ensures the table updates after every edit

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
  };

  return (
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
          {bookings.map((booking) => (
            <tr key={booking._id}>
              {editingId === booking._id ? (
                <>
                  <td>
                    {console.log("editData:", editData)}
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
                      type="number"
                      value={editData.eventGuests}
                      onChange={(e) => handleInputChange(e, "eventGuests")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData.eventNote}
                      onChange={(e) => handleInputChange(e, "eventNote")}
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
                      className={classNames(styles["bookings-table-buttons"])}
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
                  <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
                  <td>{booking.eventTime}</td>
                  <td>{booking.eventGuests}</td>
                  <td>{booking.eventNote}</td>
                  <td>{booking.status}</td>
                  <td>
                    <div
                      className={classNames(styles["bookings-table-buttons"])}
                    >
                      <button onClick={() => handleEdit(booking)}>Edit</button>
                      <button onClick={() => handleDelete(booking._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;
