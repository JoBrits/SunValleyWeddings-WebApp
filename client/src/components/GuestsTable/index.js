import { useEffect, useState } from "react";
import { useBookingContext } from "../../hooks/useBookingContext";

// Components
import GuestTable from "../../components/GuestTable";

// Styles
import classNames from "classnames";
import styles from "./GuestsTable.module.scss";

const GuestsTable = ({ view }) => {
  const { bookings, dispatch:dispatchBookings } = useBookingContext();

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch bookings when component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings/bookings");
        const data = await response.json();
        if (response.ok) {
          dispatchBookings({ type: "SET_BOOKINGS", payload: data });
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, [dispatchBookings]); //This ensures the table updates after every edit

  // Handle edit button click
  const handleEdit = (booking) => {
    console.log(booking);
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
          <h3 className="dashboard-sub-heading">
            Guest - {editData.name} {editData.surname}
          </h3>
          <div className={classNames(styles["rsvp-table"])}>
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
                    {editData.name} {editData.surname}
                  </td>
                  <td>{new Date(editData.eventDate).toLocaleDateString()}</td>
                  <td>
                    {editData.eventTime.hours} : {editData.eventTime.minutes}
                  </td>
                  <td>{editData.eventGuests}</td>
                  <td>
                    <div className={classNames(styles["rsvp-table-buttons"])}>
                      <button onClick={handleCancel}>Cancel</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={6}
                    className={classNames(styles["rsvp-table-tr-spacer"])}
                  ></td>
                </tr>
              </tbody>
            </table>
          </div>
          <GuestTable eventID={editingId} />
        </>
      )}
      {!editingId && (
        <div className={classNames(styles["guest-table"])}>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Name</th>
                <th>Email</th>
                <th>Booking Confirmed</th>
                <th>Registered User</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className={classNames(styles["guest-table-tr"])}
                >
                  <td>{booking.title}</td>
                  <td>
                    {booking.name} {booking.surname}
                  </td>
                  <td>{booking.email}</td>
                  <td>{booking.status}</td>
                  <td>"users.status"</td>
                  <td>
                    <div
                      className={classNames(styles["guest-table-buttons"])}
                    >
                      <button onClick={() => handleEdit(booking)}>
                        Edit
                      </button>
                      <button>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  colSpan={6}
                  className={classNames(styles["rsvp-table-tr-spacer"])}
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
