import { useEffect, useState } from "react";

// Context
import { useBookingContext } from "../../hooks/useBookingContext";
import { useUserContext } from "../../hooks/useUserContext";

// Hooks
import { useUpdate } from "../../hooks/useUpdate";

// Components
import Spinner from "../../components/Spinner";
import NotificationForm from "../../components/NotificationForm";

// Styles
import classNames from "classnames";
import styles from "./UsersTable.module.scss";

const UsersTable = ({ view }) => {
  const { bookings, dispatch: dispatchBookings } = useBookingContext();
  const { users, dispatch: dispatchUsers } = useUserContext();

  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({});

  const [messageEmail, setMessageEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // from useUpdate hook
  const { updateUser, error } = useUpdate();

  // Fetch bookings and users when component mounts
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);

      try {
        // Fetch Bookings
        const bookingsRes = await fetch("/api/bookings/bookings");
        const bookingsData = await bookingsRes.json();
        if (bookingsRes.ok) {
          dispatchBookings({ type: "SET_BOOKINGS", payload: bookingsData });
        }
        // Fetch Users
        const usersRes = await fetch("/api/user/users");
        const usersData = await usersRes.json();
        if (usersRes.ok) {
          dispatchUsers({ type: "SET_USERS", payload: usersData });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };
    fetchAllData();
  }, [dispatchBookings, dispatchUsers]);

  // Handle edit button click
  const handleEditUser = (user) => {
    // setEditing User
    setEditingUserId(user._id);
    setEditUserData({
      name: user.name || "",
      surname: user.surname || "",
      email: user.email || "",
    });
  };

  const handleSave = async () => {
    // use custom hook to update user
    await updateUser(editingUserId, editUserData);
    setEditingUserId(null); // Exit edit mode
    setEditUserData({}); // Reset form
    refetchUsers(); // Refetch users to update the table
  };

  const refetchUsers = async () => {
    try {
      const usersRes = await fetch("/api/user/users");
      const usersData = await usersRes.json();
      if (usersRes.ok) {
        dispatchUsers({ type: "SET_USERS", payload: usersData });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle input change for editing
  const handleInputChange = (e, field) => {
    setEditUserData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Handle cancel edit
  const handleCancelUser = () => {
    setEditingUserId(null);
    setEditUserData({});
  };

  // Handle delete booking
  const handleDeleteUser = async (user) => {
    const id = user._id;
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        dispatchUsers({ type: "DELETE_USER", payload: { _id: id } });
      } else {
        console.error("Failed to delete user:", await response.json());
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  // Handle send email // Future Use
  const handleRegistrationEmail = async (bookingEmail) => {
    // for future use
    alert(
      "for future use, the user will receive a backend generated email with instructions to complete their profile and guest list"
    );

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

  // Filter users by view
  const getFilteredUsers = () => {
    if (view === "Registered") {
      // Registered Users with their booking ID
      return users.map((user) => {
        const userBooking = bookings.find(
          (booking) => booking.email === user.email
        );
        return {
          ...user,
          bookingId: userBooking ? userBooking._id : null, // Include booking ID
        };
      });
    } else if (view === "Unregistered") {
      // Unregistered Users from bookings (only return one instance per email)
      const seenEmails = new Set();

      return bookings
        .filter((booking) => {
          if (users.some((user) => user.email === booking.email)) return false; // Skip if registered
          if (seenEmails.has(booking.email)) return false; // Skip if already added
          seenEmails.add(booking.email);
          return true;
        })
        .map((booking) => ({
          ...booking,
          bookingId: booking._id, // Use the booking's own ID
        }));
    }

    // All Users from bookings
    return [
      // Map registered users and attach their booking ID if available
      ...users.map((user) => {
        const userBooking = bookings.find(
          (booking) => booking.email === user.email
        );
        return {
          ...user,
          bookingId: userBooking ? userBooking._id : null,
        };
      }),

      // Process unregistered users, ensuring each email appears only once
      ...(() => {
        const seenEmails = new Set(); // Track emails to prevent duplicates
        return bookings
          .filter((booking) => {
            if (users.some((user) => user.email === booking.email))
              return false; // Skip if registered
            if (seenEmails.has(booking.email)) return false; // Skip if already added
            seenEmails.add(booking.email); // Mark email as seen
            return true;
          })
          .map((booking) => ({
            ...booking,
            bookingId: booking._id, // Assign the booking's own ID
          }));
      })(),
    ];
  };

  // handleUserMessage
  const handleUserMessage = (email) => {
    setMessageEmail(email);
  };
  // handleUserMessageCancel
  const handleUserMessageCancel = () => {
    setMessageEmail("");
  };

  const filteredUsers = getFilteredUsers();

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {/* Registered Users */}
          <h2>
            {view === "Registered"
              ? "Registered Users"
              : view === "Unregistered"
              ? "Unregistered Users"
              : "All Users"}
          </h2>
          <div className={classNames(styles["user-table"])}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Bookings</th>
                  <th>Registered</th>
                  <th>User Notifications</th>
                  <th>User Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((userOrBooking) => (
                  <>
                    <tr
                      key={userOrBooking._id}
                      className={classNames(styles["user-table-tr"])}
                    >
                      {editingUserId === userOrBooking._id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              value={editUserData.name}
                              onChange={(e) => handleInputChange(e, "name")}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={editUserData.surname}
                              onChange={(e) => handleInputChange(e, "surname")}
                            />
                          </td>
                          <td>
                            <input
                              type="email"
                              value={editUserData.email}
                              onChange={(e) => handleInputChange(e, "email")}
                            />
                          </td>
                          <td colSpan={4}>
                            {error && <div className="error">{error}</div>}
                          </td>
                          <td>
                            <div
                              className={classNames(
                                styles["user-table-buttons"]
                              )}
                            >
                              <button
                                onClick={() => handleSave(editingUserId._id)}
                              >
                                Save
                              </button>
                              <button onClick={handleCancelUser}>Cancel</button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{userOrBooking.name}</td>
                          <td>{userOrBooking.surname}</td>
                          <td>{userOrBooking.email}</td>
                          <td>
                            {userOrBooking.role ? userOrBooking.role : "none"}
                          </td>
                          <td>
                            {bookings.find(
                              (booking) => booking.email === userOrBooking.email
                            )?.status || "No Bookings"}
                          </td>
                          <td>
                            {users.some(
                              (user) => user.email === userOrBooking.email
                            )
                              ? "Yes"
                              : "No"}
                          </td>
                          <td>
                            {users.some(
                              (user) => user.email === userOrBooking.email
                            ) ? (
                              <div
                                className={classNames(
                                  styles["user-table-buttons"]
                                )}
                              >
                                {!messageEmail ? (
                                  <button
                                    onClick={() =>
                                      handleUserMessage(userOrBooking.email)
                                    }
                                  >
                                    Send Message
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleUserMessageCancel()}
                                  >
                                    Cancel Message
                                  </button>
                                )}
                              </div>
                            ) : (
                              <div
                                className={classNames(
                                  styles["user-table-buttons"]
                                )}
                              >
                                <button
                                  onClick={() =>
                                    handleRegistrationEmail(userOrBooking.email)
                                  }
                                >
                                  Request Registration
                                </button>
                              </div>
                            )}
                          </td>
                          <td>
                            <div
                              className={classNames(
                                styles["user-table-buttons"]
                              )}
                            >
                              {userOrBooking.role ? (
                                <>
                                  <button
                                    onClick={() =>
                                      handleEditUser(userOrBooking)
                                    }
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteUser(userOrBooking)
                                    }
                                  >
                                    Delete
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className={classNames(
                                      styles["user-table-buttons--disabled"]
                                    )}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className={classNames(
                                      styles["user-table-buttons--disabled"]
                                    )}
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                    {messageEmail === userOrBooking.email && (
                      <tr>
                        <td
                          colSpan={9}
                          className={classNames(styles["user-table-tr-spacer"])}
                        >
                          <NotificationForm userRecipient={messageEmail}/>
                        </td>
                      </tr>
                    )}
                  </>
                ))}

                <tr>
                  <td
                    colSpan={9}
                    className={classNames(styles["user-table-tr-spacer"])}
                  ></td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default UsersTable;
