import { useEffect, useState, useCallback } from "react";
import { useGuestContext } from "../../hooks/useGuestContext";

// Styles
import classNames from "classnames";
import styles from "./GuestTable.module.scss";

const GuestTable = ({ eventID }) => {
  const { guests, dispatch } = useGuestContext();

  const [editingId, setEditingId] = useState("");
  const [editData, setEditData] = useState({});

  // State to store new guest input data
  const [newGuestForm, setNewGuestForm] = useState(false);
  const [newGuest, setNewGuest] = useState({
    name: "",
    email: "",
    contact_number: "",
    status: "pending",
  });

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
    if (!newGuest.name || !newGuest.email || !newGuest.contact_number) return;

    try {
      const response = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newGuest, event_id: eventID }), // Associate guest with event ID
      });
      const data = await response.json();

      if (response.ok) {
        // Add the new guest to the context state
        dispatch({ type: "CREATE_GUEST", payload: data });

        // Reset the input fields
        setNewGuest({
          name: "",
          email: "",
          contact_number: "",
          status: "pending",
        });
      }
    } catch (error) {
      console.error("Failed to add guest:", error);
    }
  };

  // Handle edit button click
  const handleEditGuest = (guest) => {
    console.log("guest");
    console.log(guest);

    console.log("guest._id");
    console.log(guest._id);

    setEditingId(guest._id);

    setEditData({
      _id: guest._id || "",
      name: guest.name || "",
      email: guest.email || "",
      contact_number: guest.contact_number || "",
      status: guest.status || "pending",
    });
  };

  const handleSaveGuest = useCallback(async () => {
    console.log("This editingId", editingId);
    console.log("This editData", editData);
  
    try {
      const response = await fetch(`/api/guests/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });
  
      if (response.ok) {
        const guest = await response.json();
  
        // Dispatch update action to context
        dispatch({ type: "UPDATE_GUEST", payload: guest });
  
        // Reset editing state
        setEditingId(null);
        setEditData({});
      } else {
        console.error("Failed to update guest:", await response.json());
      }
    } catch (error) {
      console.error("Failed to update guest:", error);
    }
  }, [editingId, editData, dispatch]); // Dependencies array ensures the function doesn't change unless these values change.

  // Handle delete booking
  const handleDeleteGuest = async (id) => {
    try {
      const response = await fetch(`/api/guests/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        dispatch({ type: "DELETE_GUEST", payload: { _id: id } });
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

  // Fetch guests for the given user ID when the component mounts
  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await fetch(`/api/guests/${eventID}`);
        const data = await response.json();

        if (response.ok) {
          // Dispatch the fetched guests to the context state
          dispatch({ type: "SET_GUESTS", payload: data });
        }
      } catch (error) {
        console.error("Failed to fetch guests:", error);
      }
    };

    fetchGuests();
  }, [dispatch, eventID, handleSaveGuest]);

  return (
    <>
      <p></p>
      <h3 className="dashboard-sub-heading">Guests</h3>
      <div className={styles["guest-table"]}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
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
                        onChange={(e) => handleExistingInputChange(e, "name")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editData.email}
                        onChange={(e) => handleExistingInputChange(e, "email")}
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
                      <input
                        type="text"
                        value={editData.status}
                        onChange={(e) => handleExistingInputChange(e, "status")}
                      />
                    </td>
                    <td>
                      <div
                        className={classNames(styles["guest-table-buttons"])}
                      >
                        <button onClick={() => handleSaveGuest(editingId)}>
                          Save
                        </button>
                        <button onClick={handleCancelGuest}>Cancel</button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{guest.name}</td>
                    <td>{guest.email}</td>
                    <td>{guest.contact_number}</td>
                    <td>{guest.status}</td>
                    <td>
                      <div
                        className={classNames(styles["guest-table-buttons"])}
                      >
                        <button onClick={() => handleEditGuest(guest)}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteGuest(guest._id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}

            <tr>
              <td
                colSpan={5}
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
                <td></td>
                <td>
                  <div className={classNames(styles["guest-table-buttons"])}>
                    <button onClick={handleAddGuest}>Add</button>
                    <button onClick={handleAddGuestFormCancel}>cancel</button>
                  </div>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={5}>
                  <div className={classNames(styles["guest-table-buttons"])}>
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
  );
};

export default GuestTable;
