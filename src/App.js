import "./App.css";
import { useState } from "react";
import Item from "./Item/Item";

function App() {
  const [currentItem, setCurrentItem] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const allItems = items.map((elem, idx) => {
    return (
      <Item
        items={items}
        total={total}
        setTotal={setTotal}
        setItems={setItems}
        key={`item-${idx + 1}`}
        index={idx}
        name={elem}
      />
    );
  });

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!currentItem) return;
    setItems([...items, currentItem]);
    setCurrentItem("");
    setTotal(total + 1);
  };
  return (
    <div className="list-container">
      <form className="list-form" onSubmit={handleAddItem}>
        <input
          className="list-input-field"
          type="text"
          placeholder="Add an item .."
          value={currentItem}
          onChange={(e) => setCurrentItem(e.target.value)}
        />
        <input className="list-add-button" type="submit" value="+" />
      </form>
      {allItems}
      {total > 0 ? <p className="list-total">Total: {total}</p> : <></>}
    </div>
  );
}

export default App;
