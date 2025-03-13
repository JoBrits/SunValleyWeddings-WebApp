import { useEffect, useState } from "react";

// Hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useBookingContext } from "../../hooks/useBookingContext";
import { useScheduleContext } from "../../hooks/useScheduleContext";

// Components
import ScheduleForm from "../../components/ScheduleForm";
import ScheduleGuestsTable from "../../components/ScheduleGuestsTable";
import Spinner from "../../components/Spinner";

// Styles
import classNames from "classnames";
import styles from "./ScheduleTable.module.scss";

const ScheduleTable = ({ view }) => {
  // User Context
  const { user } = useAuthContext();
  // Booking Context
  const { bookings, dispatch: dispatchBookings } = useBookingContext();
  // Schedule Context
  const { schedules, dispatch: dispatchSchedules } = useScheduleContext();

  const [formId, setFormId] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);
  const [editData, setEditData] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  // Handle edit button click
  const handleExistingSchedule = (booking) => {
    // set booking ID to display Schedule table
    setScheduleId(booking._id);

    // setEditingId(booking.eventID);
    setEditData({
      title: booking.title || "",
      name: booking.name || "",
      surname: booking.surname || "",
      email: booking.email || "",
      eventDate: booking.eventDate || "",
      eventGuests: booking.eventGuests || 0,
    });
  };

  // Handle delete schedule
  const handleDeleteSchedule = async (id) => {
    try {
      const response = await fetch(`/api/schedule/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        dispatchSchedules({ type: "DELETE_SCHEDULE", payload: { _id: id } });
        setFormId(null);
        setScheduleId(null);

        // Refetch the schedules
        const schedulesRes = await fetch("/api/schedule/");
        const schedulesData = await schedulesRes.json();
        if (schedulesRes.ok) {
          dispatchSchedules({ type: "SET_SCHEDULES", payload: schedulesData });
        }
      } else {
        console.error("Failed to delete schedule:", await response.json());
      }
    } catch (error) {
      console.error("Failed to delete schedule:", error);
    }
  };

  // Handle edit button click
  const handleNewSchedule = (booking) => {
    // set booking ID to display Schedule table
    setFormId(booking._id);
    // setEditingId(booking.eventID);
    setEditData({
      title: booking.title || "",
      name: booking.name || "",
      surname: booking.surname || "",
      email: booking.email || "",
      eventDate: booking.eventDate || "",
      eventGuests: booking.eventGuests || 0,
    });
  };

  // Handle cancel edit
  const handleCancel = () => {
    setFormId(null);
    setScheduleId(null);
    setEditData({});
  };

  // handle updates after a new schedule is added.
  const handleScheduleUpdate = async () => {
    try {
      const schedulesRes = await fetch("/api/schedule/");
      const schedulesData = await schedulesRes.json();
      if (schedulesRes.ok) {
        dispatchSchedules({ type: "SET_SCHEDULES", payload: schedulesData });
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
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

        // Fetch Schedules
        const schedulesRes = await fetch("/api/schedule/");
        const schedulesData = await schedulesRes.json();
        if (schedulesRes.ok) {
          dispatchSchedules({ type: "SET_SCHEDULES", payload: schedulesData });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchAllData();
  }, [dispatchBookings, dispatchSchedules, formId]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {scheduleId && (
            <>
              <h3 className="dashboard-sub-heading">Host</h3>
              <div className={classNames(styles["schedule-table"])}>
                <table>
                  <thead>
                    <tr>
                      <th width="20%">Title</th>
                      <th width="20%">Name</th>
                      <th width="20%">Event Date</th>
                      <th width="20%">Schedule</th>
                      <th width="20%">Actions</th>
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
                      <td>{editData.eventGuests}</td>
                      <td>
                        <div
                          className={classNames(
                            styles["schedule-table-buttons"]
                          )}
                        >
                          <button onClick={handleCancel}>Cancel</button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={8}
                        className={classNames(
                          styles["schedule-table-tr-spacer"]
                        )}
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ScheduleGuestsTable
                userEventID={scheduleId}
                userEventDate={editData.eventDate}
              />
            </>
          )}

          {formId && (
            <>
              <h3 className="dashboard-sub-heading">Host</h3>
              <div className={classNames(styles["schedule-table"])}>
                <table>
                  <thead>
                    <tr>
                      <th width="20%">Title</th>
                      <th width="20%">Name</th>
                      <th width="20%">Event Date</th>
                      <th width="20%">Schedule</th>
                      <th width="20%">Actions</th>
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
                      <td>{editData.eventGuests}</td>
                      <td>
                        <div
                          className={classNames(
                            styles["schedule-table-buttons"]
                          )}
                        >
                          <button onClick={handleCancel}>Cancel</button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={8}
                        className={classNames(
                          styles["schedule-table-tr-spacer"]
                        )}
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ScheduleForm setFormId={setFormId} userEventID={formId} onScheduleUpdate={handleScheduleUpdate} />
            </>
          )}

          {!scheduleId && !formId && (
            <div className={classNames(styles["schedule-table"])}>
              <table>
                <thead>
                  <tr>
                    <th width="20%">Title</th>
                    <th width="20%">Name</th>
                    <th width="20%">Event Date</th>
                    <th width="20%">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings
                    .filter((booking) => {
                      if (view === "All") return booking.email === user.email; // Filter by email
                      return booking._id === view; // Filter by booking ID
                    })
                    .map((booking) => (
                      <tr
                        key={booking._id}
                        className={classNames(styles["schedule-table-tr"])}
                      >
                        <td>{booking.title}</td>
                        <td>
                          {booking.name} {booking.surname}
                        </td>
                        <td>
                          {new Date(booking.eventDate).toLocaleDateString()}
                        </td>
                        <td>
                          <div
                            className={classNames(
                              styles["schedule-table-buttons"]
                            )}
                          >
                            {(() => {
                              const matchingSchedules = schedules.filter(
                                (schedule) => schedule.eventID === booking._id
                              );

                              return matchingSchedules.length > 0 ? (
                                <>
                                  <button
                                    onClick={() =>
                                      handleExistingSchedule(booking)
                                    }
                                  >
                                    Manage
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteSchedule(booking._id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => handleNewSchedule(booking)}
                                >
                                  Create schedule
                                </button>
                              );
                            })()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  <tr>
                    <td
                      colSpan={8}
                      className={classNames(styles["schedule-table-tr-spacer"])}
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

export default ScheduleTable;
