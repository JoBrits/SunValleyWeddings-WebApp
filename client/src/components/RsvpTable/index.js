import { useEffect, useState } from "react";

// Components
import GuestTable from "../../components/GuestTable";
import Spinner from "../../components/Spinner";

// Styles
import classNames from "classnames";
import styles from "./RsvpTable.module.scss";

// Hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useBookingContext } from "../../hooks/useBookingContext";
import { useGuestContext } from "../../hooks/useGuestContext";

const RsvpTable = ({ view }) => {
  // User Context
  const { user } = useAuthContext();
  // Guest Context
  const { allGuests, dispatch: dispatchGuests } = useGuestContext();
  // Booking Context
  const { bookings, dispatch: dispatchBookings } = useBookingContext();

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  // Fetch bookings when component mounts

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

        // Fetch Guests for Each Booking for user side menu
        const guestsData = await Promise.all(
          bookingsData
            .filter((booking) => {
              return booking.email === user.email;
            })
            .map(async (booking) => {
              const guestsRes = await fetch(`/api/guests/${booking._id}`);
              if (guestsRes.ok) {
                return guestsRes.json();
              } else {
                return [];
              }
            })
        );

        const allGuests = guestsData.flat(); // Merge all guests into a single array

        dispatchGuests({ type: "SET_ALL_GUESTS", payload: allGuests });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchAllData();
  }, [dispatchBookings, dispatchGuests, user.email]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {editingId && (
            <>
              <h3 className="dashboard-sub-heading">Host</h3>
              <div className={classNames(styles["rsvp-table"])}>
                <table>
                  <thead>
                    <tr>
                      <th width="10%">Title</th>
                      <th width="10%">Name</th>
                      <th width="10%">Event Date</th>
                      <th width="10%">Event Time</th>
                      <th width="10%">Guests</th>
                      <th width="10%">Guests Pending</th>
                      <th width="10%">Guests Confirmed</th>
                      <th width="10%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{editData.title}</td>
                      <td>
                        {editData.name} : {editData.surname}
                      </td>
                      <td>
                        {new Date(editData.eventDate).toLocaleDateString()}
                      </td>
                      <td>
                        {editData.eventTime.hours} :{" "}
                        {editData.eventTime.minutes}
                      </td>
                      <td>{editData.eventGuests}</td>
                      <td>
                        {
                          allGuests.filter(
                            (guest) =>
                              guest.eventID === editingId &&
                              guest.status === "pending"
                          ).length
                        }
                      </td>
                      <td>
                        {
                          allGuests.filter(
                            (guest) =>
                              guest.eventID === editingId &&
                              guest.status === "confirmed"
                          ).length
                        }
                      </td>
                      <td>
                        <div
                          className={classNames(styles["rsvp-table-buttons"])}
                        >
                          <button onClick={handleCancel}>Cancel</button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={8}
                        className={classNames(styles["rsvp-table-tr-spacer"])}
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <GuestTable userEventID={editingId} userView={view} />
            </>
          )}

          {!editingId && (
            <div className={classNames(styles["rsvp-table"])}>
              <table>
                <thead>
                  <tr>
                    <th width="10%">Title</th>
                    <th width="10%">Name</th>
                    <th width="10%">Event Date</th>
                    <th width="10%">Event Time</th>
                    <th width="10%">Guests</th>
                    <th width="10%">Guests Pending</th>
                    <th width="10%">Guests Confirmed</th>
                    <th width="10%">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings
                    .filter((booking) => {
                      // All Bookings
                      if (view === "All") return booking.email === user.email;
                      if (view === "Pending")
                        return booking.email === user.email;
                      if (view === "Confirmed")
                        return booking.email === user.email;
                      // Filter by booking ID
                      return booking._id === view;
                    })
                    .map((booking) => (
                      <tr
                        key={booking._id}
                        className={classNames(styles["rsvp-table-tr"])}
                        onClick={() => handleEdit(booking)}
                      >
                        <td>{booking.title}</td>
                        <td>
                          {booking.name} {booking.surname}
                        </td>
                        <td>
                          {new Date(booking.eventDate).toLocaleDateString()}
                        </td>
                        <td>{booking.eventTime}</td>
                        <td>{booking.eventGuests} - Requested</td>
                        <td>
                          {
                            allGuests.filter(
                              (guest) =>
                                guest.eventID === booking._id &&
                                guest.status === "pending"
                            ).length
                          }
                        </td>
                        <td>
                          {
                            allGuests.filter(
                              (guest) =>
                                guest.eventID === booking._id &&
                                guest.status === "confirmed"
                            ).length
                          }
                        </td>
                        <td>
                          <div
                            className={classNames(styles["rsvp-table-buttons"])}
                          >
                            <button onClick={() => handleEdit(booking)}>
                              View Guests
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  <tr>
                    <td
                      colSpan={8}
                      className={classNames(styles["rsvp-table-tr-spacer"])}
                    ></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RsvpTable;
