import { useEffect, useState } from "react";
import { useGuestContext } from "../../hooks/useGuestContext";
import { useBookingContext } from "../../hooks/useBookingContext";
import { Link } from "react-router-dom";

// Components
import Spinner from "../../components/Spinner";

// Styles
import classNames from "classnames";
import styles from "./RsvpList.module.scss";

const RsvpList = ({ user }) => {
  const { guests, dispatch: guestDispatch } = useGuestContext();
  const { selectedBookings, dispatch: selectedBookingsDispatch } =
    useBookingContext();

  const [loading, setLoading] = useState(false);

  // Fetch guests for the given user ID when the component mounts
  useEffect(() => {
    const fetchGuests = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/guests/${user.id}`);
        const data = await response.json();

        if (response.ok) {
          // Dispatch the fetched guests to the context state
          guestDispatch({ type: "SET_GUESTS", payload: data });
        }
      } catch (error) {
        console.error("Failed to fetch guests:", error);
      }
      setLoading(false);
    };

    fetchGuests();
  }, [guestDispatch, user]);

  // Fetch bookings when component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/bookings/${user.email}`);
        const data = await response.json();

        if (response.ok) {
          selectedBookingsDispatch({ type: "SET_BOOKING", payload: data });
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
      setLoading(false);
    };
    fetchBookings();
  }, [selectedBookingsDispatch, user]); //This ensures the table updates after every edit

  return (
    <div className={classNames(styles["rsvp-list-container"])}>
      {loading && <Spinner />}
      {!loading && (
        <>
          {/* Wedding Booking Details */}
          {selectedBookings && (
            <div className={classNames(styles["rsvp-list"])}>
              <ul className={classNames(styles["rsvp-list-items"])}>
                {selectedBookings.map((selectedBooking) => (
                  <RSVPItem
                    key={selectedBooking._id}
                    booking={selectedBooking}
                    guests={guests}
                  />
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Extracted BookingItem component for reusability
const RSVPItem = ({ booking, guests }) => {
  const bookingDate = new Date(booking.eventDate); // Convert to Date object
  const formattedBookingDate = bookingDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <li>
      <Link
        to={`/user/bookings/${booking._id}`}
        className={classNames(styles["rsvp-list-item"])}
      >
        <div className={classNames(styles["rsvp-list-request"])}>
          <p>The Big Day</p>
          <span className={classNames(styles["rsvp-list-received"])}>
            <strong>{formattedBookingDate}</strong>
          </span>
        </div>
        <div className={classNames(styles["rsvp-list-request"])}>
          <p>Time</p>
          <span className={classNames(styles["rsvp-list-received"])}>
            <strong>{booking.eventTime}</strong>
          </span>
        </div>
        <div className={classNames(styles["rsvp-list-request"])}>
          <p>Booking Status</p>
          <span className={classNames(styles["rsvp-list-received"])}>
            <strong>{booking.status}</strong>
          </span>
        </div>
      </Link>
      {guests.length < 1 ? (
        <>
          <div className={classNames(styles["rsvp-list-item--2"])}>
            <p>You have not added your guests.</p>
          </div>
          <div className={classNames(styles["rsvp-list-item--2"])}>
            <button>Manage Guests</button>
          </div>
        </>
      ) : (
        <ul className={classNames(styles["rsvp-list"])}>
          {guests.map((guest) => (
            <li>
              <Link
                to={`/user/guests/`}
                className={classNames(styles["rsvp-list-item"])}
              >
                <div className={classNames(styles["rsvp-list-request"])}>
                  <p>
                    <strong>{guest.name}</strong>
                  </p>

                  <p>
                    <strong>{guest.status}</strong>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default RsvpList;
