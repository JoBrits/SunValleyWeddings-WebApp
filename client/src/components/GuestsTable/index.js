import { useEffect, useState } from "react";

// Components
import GuestTable from "../../components/GuestTable";

// Styles
import classNames from "classnames";
import styles from "./GuestsTable.module.scss";

// Hooks
import { useBookingContext } from "../../hooks/useBookingContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const GuestsTable = ({view}) => {

  // fetch user from useAuthContext
  const { user } = useAuthContext();

  const { confirmedBookings, dispatch } = useBookingContext();

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
  }, [dispatch]); //This ensures the table updates after every edit

  // Handle edit button click
  const handleEdit = (booking) => {
    // split hours and minutes
    const [splitHours, splitMinutes] = booking.eventTime
      .split(" : ")
      .map((val) => val.trim());

    setEditingId(booking._id);
    // setEditingId(booking.eventID);
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

  // Handle cancel edit
  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  return (
    <>
      {editingId && (
        <>
          <h3 className="dashboard-sub-heading">Host</h3>
          <div className={classNames(styles["guests-table"])}>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Name</th>
                  <th>Event Date</th>
                  <th>Event Time</th>
                  <th>Guests</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{editData.title}</td>
                  <td>
                    {editData.name} : {editData.surname}
                  </td>
                  <td>{new Date(editData.eventDate).toLocaleDateString()}</td>
                  <td>
                    {editData.eventTime.hours} : {editData.eventTime.minutes}
                  </td>
                  <td>{editData.eventGuests}</td>
                  <td>
                    <div className={classNames(styles["guests-table-buttons"])}>
                      <button onClick={handleCancel}>Cancel</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={6}
                    className={classNames(styles["guests-table-tr-spacer"])}
                  ></td>
                </tr>
              </tbody>
            </table>
          </div>
          <GuestTable userEventID={editingId} />
        </>
      )}

      {!editingId && (
        <div className={classNames(styles["guests-table"])}>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Name</th>
                <th>Event Date</th>
                <th>Event Time</th>
                <th>Guests</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {confirmedBookings
              .filter((booking) => {
                if (view === "All") return true;
                if (view === "Pending") return booking.status === "pending";
                if (view === "Confirmed")
                  return booking.status === "confirmed";
                if (view === "email") return booking.email === user.email; // Filter by email
                return booking._id === view; // Filter by booking ID
              })
              .map((booking) => (
                <tr
                  key={booking._id}
                  className={classNames(styles["guests-table-tr"])}
                  onClick={() => handleEdit(booking)}
                >
                  <td>{booking.title}</td>
                  <td>
                    {booking.name} {booking.surname}
                  </td>
                  <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
                  <td>{booking.eventTime}</td>
                  <td>{booking.eventGuests}</td>
                  <td>
                    <div className={classNames(styles["guests-table-buttons"])}>
                      <button onClick={() => handleEdit(booking)}>View Guests</button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  colSpan={6}
                  className={classNames(styles["guests-table-tr-spacer"])}
                ></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default GuestsTable;
