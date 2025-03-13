import { useState, useEffect } from "react";

// Components
import Spinner from "../../components/Spinner";

// Styles
import classNames from "classnames";
import styles from "./ScheduleGuestsTable.module.scss";

const ScheduleGuestsTable = ({ userEventID, userEventDate }) => {
  // State hooks to manage loading, schedule data, errors, and which section is being edited
  const [isLoading, setIsLoading] = useState(false);
  const [userSchedule, setUserSchedule] = useState({});
  const [error, setError] = useState(null);
  const [editSection, setEditSection] = useState(null); // Track the section being edited
  const [editData, setEditData] = useState({});

  // Filter the schedule sections to exclude unnecessary fields
  const eventSections = Object.entries(userSchedule).filter(
    ([key]) =>
      key !== "_id" && key !== "__v" && key !== "createdAt" && key !== "eventID"
  );

  // Handle input changes for the existing guest fields when editing
  const handleInputChange = (e, field) => {
    setEditData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Handle the edit button click and populate the edit form with existing data
  const handleEditSection = (sectionKey, section) => {
    setEditSection(sectionKey); // Set the section to be edited
    setEditData({
      time: section.time || "",
      heading: section.heading || "",
      location: section.location || "",
      note: section.note || "",
      dressCode: section.dressCode || "",
    });
  };

  // Handle the save action when editing a section
  const handleSaveSection = async () => {
    setIsLoading(true); // Show loading spinner
    try {
      const response = await fetch(`/api/schedule/${userEventID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionKey: editSection, // The key of the section to be updated
          sectionData: editData, // The data to update the section with
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update section");
      }

      // Reset edit mode and clear data after saving
      setEditSection(null);
      setEditData({});
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating section:", error.message);
      alert("Something went wrong. Please try again.");
    }
  };

  // Handle cancel action and reset edit mode without saving changes
  const handleCancelSection = () => {
    setEditSection(null); // Disable editing
    setEditData({}); // Clear edited data
  };

  // Fetch the schedule data from the API when the component mounts or when `edit` changes
  useEffect(() => {
    const fetchSchedule = async () => {
      setIsLoading(true); // Show loading spinner
      setError(null); // Reset previous error

      try {
        const response = await fetch(`/api/schedule/${userEventID}`);

        if (!response.ok) throw new Error("Failed to fetch schedule");

        const data = await response.json();

        // Set fetched data to state if successful
        setUserSchedule(data);
      } catch (error) {
        console.error("Failed to fetch schedule:", error);
        setError(error.message); // Set error message
      }

      setIsLoading(false); // Hide loading spinner
    };

    fetchSchedule(); // Call fetch function
  }, [editSection, userEventID]); // Dependency array: re-fetch when `editSection` or `userEventID` changes

  return (
    <>
      {isLoading && <Spinner />} {/* Show spinner if loading */}
      {error && <p>{error}</p>} {/* Show error message if any error occurs */}
      {!isLoading && !error && (
        <div className={styles["schedule-guest-table"]}>
          <table>
            <thead>
              <tr>
                <th width="100%" colSpan={2}>
                  <div className={styles["schedule-guest-table-header"]}>
                    <h2>Sun Valley Wedding and Golf Venue</h2>
                    <div
                      className={styles["schedule-guest-table-header-details"]}
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
                        <p>{new Date(userEventDate).toLocaleDateString()}</p>
                        <p>H2JF+63W Eikenhof, South Africa</p>
                        <p>+27 83 881 8132</p>
                      </div>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Render each event section dynamically */}
              {eventSections.map(([key, value]) => (
                <tr key={key}>
                  <td width="80%">
                    <div className={styles["schedule-guest-table-content"]}>
                      <h3 className="dashboard-sub-heading">{value.heading}</h3>
                      {editSection === key ? ( // Only allow editing for the selected section
                        <>
                          <label>time</label>
                          <input
                            type="text"
                            value={editData.time || value.time}
                            onChange={(e) => handleInputChange(e, "time")}
                          />
                          <label>heading</label>
                          <input
                            type="text"
                            value={editData.heading || value.heading}
                            onChange={(e) => handleInputChange(e, "heading")}
                          />
                          <label>location</label>
                          <input
                            type="text"
                            value={editData.location || value.location}
                            onChange={(e) => handleInputChange(e, "location")}
                          />
                          <label>note</label>
                          <input
                            type="text"
                            value={editData.note || value.note}
                            onChange={(e) => handleInputChange(e, "note")}
                          />
                          <label>dressCode</label>
                          <input
                            type="text"
                            value={editData.dressCode || value.dressCode}
                            onChange={(e) => handleInputChange(e, "dressCode")}
                          />
                        </>
                      ) : (
                        <>
                          <p>
                            <strong>Time:</strong> {value.time}
                          </p>
                          <p>
                            <strong>Location:</strong> {value.location}
                          </p>
                          <p>{value.note}</p>
                          {value.dressCode && (
                            <p>
                              <strong>Dress Code:</strong> {value.dressCode}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={styles["schedule-guest-table-buttons"]}>
                      {/* Show edit buttons for the specific section being edited */}
                      {editSection === key ? (
                        <>
                          <button onClick={handleSaveSection}>Save</button>
                          <button onClick={handleCancelSection}>Cancel</button>
                        </>
                      ) : (
                        <button onClick={() => handleEditSection(key, value)}>
                          Edit
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  colSpan={2}
                  className={classNames(styles["schedule-table-tr-spacer"])}
                ></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ScheduleGuestsTable;
