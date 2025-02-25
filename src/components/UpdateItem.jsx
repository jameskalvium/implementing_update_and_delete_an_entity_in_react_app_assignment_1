import { useState, useEffect } from "react";

const UpdateItem = ({ itemId }) => {
     // 1. Create a state for the form
    // 2. Create a function to handle the form submission
    // 3. Create a function to handle the form input changes

    // your code here
    const [item, setItem] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/${itemId}`;

    // Fetch existing item on mount
    useEffect(() => {
        fetch(API_URI)
            .then((res) => res.json())
            .then((data) => {
                setItem(data);
                setUpdatedName(data.name); // Assuming "name" is an editable field
            })
            .catch((error) => console.error("Error fetching item:", error));
    }, [API_URI]);

    // Handle input change
    const handleChange = (e) => {
        setUpdatedName(e.target.value);
    };

    // Handle update submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_URI, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: updatedName }),
            });
            const result = await response.json();
            setItem(result);
            alert("Item updated successfully!");
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    if (!item) return <p>Loading...</p>;

    return (
        <div>
            <h2>Update Item</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={updatedName}
                    onChange={handleChange}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateItem;
