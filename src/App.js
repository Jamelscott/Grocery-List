import "./App.css";
import { useState } from "react";
import Item from "./Item/Item";

function App() {
  const [currentItem, setCurrentItem] = useState("");
  const [items, setItems] = useState([]);
  const allItems = items.map((elem, idx) => {
    return (
      <Item
        setItems={setItems}
        key={`item-${idx + 1}`}
        index={idx + 1}
        name={elem}
      />
    );
  });

  const handleAddItem = (e) => {
    e.preventDefault();
    setItems([...items, currentItem]);
    setCurrentItem("");
  };
  return (
    <div className="list-container">
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="add an item .."
          value={currentItem}
          onChange={(e) => setCurrentItem(e.target.value)}
        />
        <input type="submit" value="+" />
      </form>
      {allItems}
    </div>
  );
}

export default App;
