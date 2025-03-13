import { useState, useEffect } from "react";

// Components
import Spinner from "../../components/Spinner";

// Styles
import classNames from "classnames";
import styles from "./ScheduleGuestsTable.module.scss";

const ScheduleGuestsTable = ({ userEventID, userEventDate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userSchedule, setUserSchedule] = useState({});
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({});

  // Handle input change existing guest fields
  const handleExistingInputChange = (e, field) => {
    setEditData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Handle edit button click
  const handleEditSection = (section) => {
    setEdit(true);
    // setEditingId(booking.eventID);
    setEditData({
      time: section.time || "",
      heading: section.heading || "",
      location: section.location || "",
      note: section.note || "",
      dressCode: section.dressCode || "",
    });
  };

  const handleSaveSection = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/schedule/${userEventID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        throw new Error("Failed to update section");
      }

      setEdit(false);
      setEditData({});
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating section:", error.message);
      alert("Something went wrong. Please try again.");
    }
  };

  // Handle cancel edit
  const handleCancelSection = () => {
    setEdit(false);
    setEditData({});
  };

  // Fetch Schedule data
  useEffect(() => {
    const fetchSchedule = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/schedule/${userEventID}`);

        // error handling
        if (!response.ok) throw new Error("Failed to fetch schedule");

        const data = await response.json();

        if (response.ok) {
          setUserSchedule(data);
        }
      } catch (error) {
        console.error("Failed to fetch schedule:", error);
        setError(error.message);
      }

      setIsLoading(false);
    };

    fetchSchedule();
  }, [edit]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {/* Load form if no userSchedule */}
          {!userSchedule && (
            <>
            
            </>
          )}
          <>
            <div className={styles["schedule-guest-table"]}>
              <table>
                <thead>
                  <tr>
                    <th width="100%" colSpan={2}>
                      <div className={styles["schedule-guest-table-header"]}>
                        <h2>Sun Valley Wedding and Golf Venue</h2>
                        <div
                          className={
                            styles["schedule-guest-table-header-details"]
                          }
                        >
                          <div
                            className={
                              styles["schedule-guest-table-header-details-item"]
                            }
                          >
                            <p>Date</p>
                            <p>Location</p>
                            <p>Contact</p>
                          </div>
                          <div
                            className={
                              styles["schedule-guest-table-header-details-item"]
                            }
                          >
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>
                          </div>
                          <div
                            className={
                              styles["schedule-guest-table-header-details-item"]
                            }
                          >
                            <p>
                              {new Date(userEventDate).toLocaleDateString()}
                            </p>
                            <p>H2JF+63W Eikenhof, South Africa</p>
                            <p>+27 83 881 8132</p>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={userSchedule.eventID}>
                    <td width="80%">
                      <div className={styles["schedule-guest-table-content"]}>
                        {edit === true ? (
                          <>
                            <input
                              type="text"
                              value={editData.time || ""}
                              onChange={(e) =>
                                handleExistingInputChange(e, "title")
                              }
                            />
                            <input
                              type="text"
                              value={editData.heading || ""}
                              onChange={(e) =>
                                handleExistingInputChange(e, "title")
                              }
                            />
                            <input
                              type="text"
                              value={editData.location || ""}
                              onChange={(e) =>
                                handleExistingInputChange(e, "title")
                              }
                            />
                            <input
                              type="text"
                              value={editData.note || ""}
                              onChange={(e) =>
                                handleExistingInputChange(e, "title")
                              }
                            />
                            <input
                              type="text"
                              value={editData.dressCode || ""}
                              onChange={(e) =>
                                handleExistingInputChange(e, "title")
                              }
                            />
                          </>
                        ) : (
                          <>
                            {/* {userSchedule.map((section) => (
                            <div key={section}>
                              <p>
                                {section.time} - {section.heading}
                              </p>
                              <ul>
                                <li>{section.location}</li>
                                <li>{section.note}</li>
                                <li>{section.dressCode}</li>
                              </ul>
                            </div>
                          ))} */}
                          </>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className={styles["schedule-guest-table-buttons"]}>
                        {edit === true ? (
                          <>
                            <button onClick={handleSaveSection}>Save</button>
                            <button onClick={handleCancelSection}>
                              Cancel
                            </button>
                          </>
                        ) : (
                          // <button onClick={() => handleEditSection(section)}>
                          //   Edit
                          // </button>
                          <button>Edit</button>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={2}
                      className={classNames(styles["schedule-table-tr-spacer"])}
                    ></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        </>
      )}
    </>
  );
};

export default ScheduleGuestsTable;
