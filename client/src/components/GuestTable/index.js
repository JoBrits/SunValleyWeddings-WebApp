import { useEffect, useState, useCallback } from "react";
import { useGuestContext } from "../../hooks/useGuestContext";

// Components
import Spinner from "../../components/Spinner";

// Styles
import classNames from "classnames";
import styles from "./GuestTable.module.scss";

const GuestTable = ({ userEventID }) => {
  const { guests = [], dispatch } = useGuestContext();

  // State to store existing guest input data
  const [editingId, setEditingId] = useState("");
  const [editData, setEditData] = useState({});

  // State to store new guest input data
  const [newGuestForm, setNewGuestForm] = useState(false);
  const [newGuest, setNewGuest] = useState({
    name: "",
    surname: "",
    email: "",
    contact_number: "",
    role: "",
    status: "pending",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes for new guest fields
  const handleInputChange = (e) => {
    setNewGuest({ ...newGuest, [e.target.name]: e.target.value });
  };

  // Handle input change existing guest fields
  const handleExistingInputChange = (e, field) => {
    setEditData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Function to display form for a new guest
  const handleAddGuestForm = () => {
    setNewGuestForm(true);
  };
  const handleAddGuestFormCancel = () => {
    setNewGuestForm(false);
  };
  // Function to add a new guest
  const handleAddGuest = async () => {
    // Ensure all required fields are filled
    if (
      !newGuest.name ||
      !newGuest.surname ||
      !newGuest.email ||
      !newGuest.contact_number ||
      !newGuest.role
    )
      return;

    try {
      const response = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newGuest, eventID: userEventID }), // Associate guest with user ID
      });
      const data = await response.json();

      if (response.ok) {
        // Add the new guest to the context state
        dispatch({ type: "CREATE_GUEST", payload: data });

        // Reset the input fields
        setNewGuest({
          name: "",
          surname: "",
          email: "",
          contact_number: "",
          role: "",
          status: "pending",
        });
      }
    } catch (error) {
      console.error("Failed to add guest:", error);
    }
  };

  // Handle edit button click
  const handleEditGuest = (guest) => {
    setEditingId(guest._id);

    setEditData({
      _id: guest._id || "",
      name: guest.name || "",
      surname: guest.surname || "",
      email: guest.email || "",
      contact_number: guest.contact_number || "",
      role: guest.role || "",
      status: guest.status || "pending",
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

  // Handle delete booking
  const handleDeleteGuest = async (id) => {
    try {
      const response = await fetch(`/api/guests/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh guest list after deletion
        fetchGuests();
      } else {
        console.error("Failed to delete guest:", await response.json());
      }
    } catch (error) {
      console.error("Failed to delete guest:", error);
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
          <div className={styles["guest-table"]}>
            <table>
              <thead>
                <tr>
                  <th>Guest Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Wedding Party</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {guests.length > 0 ? (
                  <>
                    {/* Render existing guests in the table */}
                    {guests.map((guest) => (
                      <tr
                        key={guest._id}
                        className={classNames(styles["guest-table-tr"])}
                      >
                        {editingId === guest._id ? (
                          <>
                            <td>
                              <input
                                type="text"
                                value={editData.name}
                                onChange={(e) =>
                                  handleExistingInputChange(e, "name")
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                value={editData.surname}
                                onChange={(e) =>
                                  handleExistingInputChange(e, "surname")
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                value={editData.email}
                                onChange={(e) =>
                                  handleExistingInputChange(e, "email")
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                value={editData.contact_number}
                                onChange={(e) =>
                                  handleExistingInputChange(e, "contact_number")
                                }
                              />
                            </td>
                            <td>
                              <select
                                value={editData.role}
                                onChange={(e) =>
                                  handleExistingInputChange(e, "role")
                                }
                              >
                                <option value="Bride">Bride</option>
                                <option value="Bridesmaid">Bridesmaid</option>
                                <option value="BridesSide">BridesSide</option>
                                <option value="Groom">Groom</option>
                                <option value="Groomsmen">Groomsmen</option>
                                <option value="GroomsSide">GroomsSide</option>
                              </select>
                            </td>
                            <td>
                              <select
                                value={editData.status}
                                onChange={(e) =>
                                  handleExistingInputChange(e, "status")
                                }
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                              </select>
                            </td>
                            <td>
                              <div
                                className={classNames(
                                  styles["guest-table-buttons"]
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
                            <td>{guest.name}</td>
                            <td>{guest.surname}</td>
                            <td>{guest.email}</td>
                            <td>{guest.contact_number}</td>
                            <td>{guest.role}</td>
                            <td>{guest.status}</td>
                            <td>
                              <div
                                className={classNames(
                                  styles["guest-table-buttons"]
                                )}
                              >
                                <button onClick={() => handleEditGuest(guest)}>
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteGuest(guest._id)}
                                >
                                  Delete
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
                    <td colSpan="3">
                      <p>No guests available</p>
                    </td>
                  </tr>
                )}
                <tr>
                  <td
                    colSpan={7}
                    className={classNames(styles["guest-table-tr-spacer"])}
                  ></td>
                </tr>

                {/* Last row contains input fields to add a new guest */}
                {newGuestForm === true ? (
                  <tr>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={newGuest.name}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="surname"
                        value={newGuest.surname}
                        onChange={handleInputChange}
                        placeholder="Enter surname"
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={newGuest.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="contact_number"
                        value={newGuest.contact_number}
                        onChange={handleInputChange}
                        placeholder="Enter contact"
                      />
                    </td>
                    <td>
                      <select
                        value={newGuest.role}
                        name="role"
                        onChange={handleInputChange}
                      >
                        <option value="Select">Select</option>
                        <option value="Bride">Bride</option>
                        <option value="Bridesmaid">Bridesmaid</option>
                        <option value="BridesSide">BridesSide</option>
                        <option value="Groom">Groom</option>
                        <option value="Groomsmen">Groomsmen</option>
                        <option value="GroomsSide">GroomsSide</option>
                      </select>
                    </td>
                    <td></td>
                    <td>
                      <div
                        className={classNames(styles["guest-table-buttons"])}
                      >
                        <button onClick={handleAddGuest}>Add</button>
                        <button onClick={handleAddGuestFormCancel}>
                          cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={7}>
                      <div
                        className={classNames(styles["guest-table-buttons"])}
                      >
                        <button onClick={handleAddGuestForm}>
                          Add a new guest
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default GuestTable;
