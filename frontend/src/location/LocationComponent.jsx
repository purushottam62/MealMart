import React, { useEffect, useState } from "react";

const LocationComponent = () => {
  const [location, setLocation] = useState({
    city: "",
    region: "",
    country: "",
    postal_code: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch user location on component mount
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/location/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Use your auth token
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch location");
        }

        const data = await response.json();
        setLocation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/location/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use your auth token
        },
        body: JSON.stringify(location),
      });

      if (!response.ok) {
        throw new Error("Failed to update location");
      }

      const updatedLocation = await response.json();
      setLocation(updatedLocation);
      alert("Location updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>User Location</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Save Address"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={location.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Region:</label>
            <input
              type="text"
              name="region"
              value={location.region}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={location.country}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Postal Code:</label>
            <input
              type="text"
              name="postal_code"
              value={location.postal_code}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Update Location</button>
        </form>
      )}
    </div>
  );
};

export default LocationComponent;
