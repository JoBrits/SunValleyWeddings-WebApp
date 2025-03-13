import { useState } from "react";

// Components
import Spinner from "../../components/Spinner";

const ScheduleForm = ({ userEventID }) => {
  // Initialize form state with an empty eventID and empty objects for each section
  const [formData, setFormData] = useState({
    eventID: userEventID,
    arrival: {},
    ceremony: {},
    photos: {},
    cocktails: {},
    reception: {},
    speechesAndFirstDance: {},
    cakeCutting: {},
    entertainment: {},
    farewell: {},
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  // Handles updating the state when an input field is changed
  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Send a POST request to the backend with the form data using fetch
      const response = await fetch("/api/schedule/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // Parse the response JSON

      if (!response.ok) {
        setIsLoading(false);
        setError(data.error);
        return data; // Return the error response
      }

      if (response.ok) {        
        console.log("Schedule created successfully!"); // Notify user of success
        console.log(data); // Log the response for debugging

        // update loading state
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      console.error("Error creating schedule:", error); // Log error details
      alert("Failed to create schedule"); // Notify user of failure
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <form  className="general-form"  onSubmit={handleSubmit}>
          {/* Input field for event ID */}
          {/* <label>
            Event ID:
            <input
              type="text"
              value={formData.eventID}
              onChange={(e) =>
                setFormData({ ...formData, eventID: e.target.value })
              }
              required
            />
          </label> */}

          {/* Iterate over each section of the schedule and render input fields */}
          {[
            "arrival",
            "ceremony",
            "photos",
            "cocktails",
            "reception",
            "speechesAndFirstDance",
            "cakeCutting",
            "entertainment",
            "farewell",
          ].map((section) => (
            <fieldset key={section}>
              <legend className="dashboard-sub-heading" >{section}</legend>
              <label>
                Time:
                <input
                  type="text"
                  onChange={(e) =>
                    handleChange(section, "time", e.target.value)
                  }
                />
              </label>
              <label>
                Heading:
                <input
                  type="text"
                  onChange={(e) =>
                    handleChange(section, "heading", e.target.value)
                  }
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  onChange={(e) =>
                    handleChange(section, "location", e.target.value)
                  }
                />
              </label>
              <label>
                Note:
                <input
                  type="text"
                  onChange={(e) =>
                    handleChange(section, "note", e.target.value)
                  }
                />
              </label>
              <label>
                Dress Code:
                <input
                  type="text"
                  onChange={(e) =>
                    handleChange(section, "dressCode", e.target.value)
                  }
                />
              </label>
            </fieldset>
          ))}

          {/* Submit button to create schedule */}
          <button className="button" type="submit">Create Schedule</button>
          {error && <div className="error">{error}</div>}
        </form>
      )}
    </>
  );
};

export default ScheduleForm;
