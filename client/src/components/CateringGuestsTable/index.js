import { useEffect, useState, useCallback } from "react";
import { useGuestContext } from "../../hooks/useGuestContext";

// Components
import Spinner from "../../components/Spinner";

// Styles
import classNames from "classnames";
import styles from "./CateringGuestsTable.module.scss";

const CateringGuestsTable = ({ userEventID }) => {
  const { guests = [], dispatch } = useGuestContext();

  // State to store existing guest input data
  const [editingId, setEditingId] = useState("");
  const [editData, setEditData] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  // Handle input change existing guest fields
  const handleExistingInputChange = (e, field) => {
    setEditData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Handle edit button click
  const handleEditGuest = (guest) => {
    setEditingId(guest._id);
    setEditData({
      _id: guest._id || "",
      name: guest.name || "",
      surname: guest.surname || "",
      restrictions: guest.restrictions || "",
      allergies: guest.allergies || "",
      requirements: guest.requirements || "",
    });
  };

  const handleSaveGuest = async () => {
    try {
      const response = await fetch(`/api/guests/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        throw new Error("Failed to update guest");
      }

      await response.json();
      setEditingId(null);
      setEditData({});

      // Refresh guest list
      fetchGuests();
    } catch (error) {
      console.error("Error updating guest:", error.message);
      alert("Something went wrong. Please try again.");
    }
  };

  // Handle cancel edit
  const handleCancelGuest = () => {
    setEditingId(null);
    setEditData({});
  };

  const fetchGuests = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/guests/${userEventID}`);
      const data = await response.json();

      if (response.ok && Array.isArray(data)) {
        dispatch({ type: "SET_GUESTS", payload: data });
      } else {
        console.error("Invalid guests data received", data);
        dispatch({ type: "SET_GUESTS", payload: [] });
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch guests:", error);
      dispatch({ type: "SET_GUESTS", payload: [] });
    }
  }, [dispatch, userEventID]);

  // Fetch guests on mount
  useEffect(() => {
    fetchGuests();
  }, [fetchGuests, userEventID]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div className={styles["catering-guest-table"]}>
            <table>
              <thead>
                <tr>
                  <th width="20%">Guest</th>
                  <th width="20%">Dietary Restrictions</th>
                  <th width="20%">Allergies</th>
                  <th width="20%">Special Requirements</th>
                  <th width="20%">Actions</th>
                </tr>
              </thead>
              <tbody>
                {guests.length > 0 ? (
                  <>
                    {/* Render existing guests in the table */}
                    {guests.map((guest) => (
                      <tr
                        key={guest._id}
                        className={classNames(
                          styles["catering-guest-table-tr"]
                        )}
                      >
                        {editingId === guest._id ? (
                          <>
                            <td>
                              {guest.name} {guest.surname}
                            </td>
                            <td>
                              <select
                                value={editData.restrictions}
                                onChange={(e) =>
                                  handleExistingInputChange(e, "restrictions")
                                }
                              >
                                <option value="None">None</option>
                                <option value="Yes">Yes</option>
                              </select>
                            </td>
                            <td>
                              <select
                                value={editData.allergies}
                                onChange={(e) =>
                                  handleExistingInputChange(e, "allergies")
                                }
                              >
                                <option value="None">None</option>
                                <option value="Yes">Yes</option>
                              </select>
                            </td>
                            <td>
                              <input
                                type="text"
                                value={editData.requirements}
                                onChange={(e) =>
                                  handleExistingInputChange(e, "requirements")
                                }
                              />
                            </td>

                            <td>
                              <div
                                className={classNames(
                                  styles["catering-guest-table-buttons"]
                                )}
                              >
                                <button onClick={() => handleSaveGuest()}>
                                  Save
                                </button>
                                <button onClick={handleCancelGuest}>
                                  Cancel
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>
                              {guest.name} {guest.surname}
                            </td>
                            <td>
                              {guest.restrictions ? guest.restrictions : "none"}
                            </td>
                            <td>
                              {guest.allergies ? guest.allergies : "none"}
                            </td>
                            <td>
                              {guest.requirements ? guest.requirements : "none"}
                            </td>
                            <td>
                              <div
                                className={classNames(
                                  styles["catering-guest-table-buttons"]
                                )}
                              >
                                <button onClick={() => handleEditGuest(guest)}>
                                  Edit
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan="5">
                      <p>No guests available</p>
                    </td>
                  </tr>
                )}
                <tr>
                  <td
                    colSpan={7}
                    className={classNames(
                      styles["catering-guest-table-tr-spacer"]
                    )}
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

export default CateringGuestsTable;
