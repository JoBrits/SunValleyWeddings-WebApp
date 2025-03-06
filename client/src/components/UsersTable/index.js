import { useEffect, useState } from "react";
import { useBookingContext } from "../../hooks/useBookingContext";
import { useUserContext } from "../../hooks/useUserContext";

// Components
import GuestTable from "../../components/GuestTable";

// Styles
import classNames from "classnames";
import styles from "./UsersTable.module.scss";

const UsersTable = ({ view }) => {
  const { bookings, dispatch: dispatchBookings } = useBookingContext();
  const { users, dispatch: dispatchUsers } = useUserContext();

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

  // Fetch users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user/users");
        const data = await response.json();
        if (response.ok) {
          dispatchUsers({ type: "SET_USERS", payload: data });
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, [dispatchUsers]); //This ensures the table updates after every edit

  // Handle edit button click
  const handleEdit = (booking) => {
    console.log(booking);
  };

  // Handle cancel edit
  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  // Handle send email
  const handleRegistrationEmail = async (bookingEmail) => {

    
    // for future use
    alert("for future use, the user will receive a backend generated email with instructions to complete their profile and guest list");

    // if (!bookingEmail) {
    //   console.error("No email provided for booking.");
    //   return;
    // }

    // try {
    //   const response = await fetch("/api/email/send-register", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email: bookingEmail }),
    //   });

    //   const data = await response.json();
    //   if (response.ok) {
    //     alert("Invitation email sent to " + bookingEmail);
    //   } else {
    //     alert("Failed to send email: " + data.error);
    //   }
    // } catch (error) {
    //   console.error("Error sending email:", error);
    // }
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
                  <td>
                    <div className={classNames(styles["guest-table-buttons"])}>
                      {users.some((user) => user.email === booking.email) ? (
                        "Yes"
                      ) : (
                        <button
                          onClick={() => handleRegistrationEmail(booking.email)}
                        >
                          Request Registration
                        </button>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={classNames(styles["guest-table-buttons"])}>
                      <button onClick={() => handleEdit(booking)}>Edit</button>
                      <button>Delete</button>
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

export default UsersTable;
