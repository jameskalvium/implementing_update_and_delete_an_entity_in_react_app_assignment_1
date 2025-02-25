import { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {

    // Get the existing item from the server
  // const [item, setItem] = useState(null);
  // pass the item to UpdateItem as a prop
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        fetch(API_URI)
            .then((res) => res.json())
            .then((data) => setItems(data))
            .catch((error) => console.error("Error fetching items:", error));
    }, []);

    return (
        <div>
            <h1>Doors List</h1>
            {items.map((item) => (
                <div key={item.id}>
                    <p>{item.name}</p>
                    <UpdateItem itemId={item.id} />
                </div>
            ))}
        </div>
    );
}

export default App;


