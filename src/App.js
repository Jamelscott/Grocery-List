import bookmarkAdd from "../src/bookmark_add.svg";
import bookmarkConfirm from "../src/bookmark_confirm.svg";
import bookmarkGreenCheck from "../src/bookmark_greencheck.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Item from "./Item/Item";
import { supabase } from "./supabaseClient";

function App() {
  const massageDataTool = (arr) => {
    return arr.map((elem, idx) => {
      return { name: elem.name, quantity: elem.quantity };
    });
  };

  const [currentItem, setCurrentItem] = useState("");
  const [updates, setUpdates] = useState(false);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const allItems = items.map((elem, idx) => {
    return (
      <Item
        massageDataTool={massageDataTool}
        quantity={elem.quantity}
        setUpdates={setUpdates}
        items={items}
        setItems={setItems}
        total={total}
        setTotal={setTotal}
        key={`saved-item-${idx + 1}`}
        index={idx}
        name={elem.name}
      />
    );
  });

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!currentItem) return;
    let checkListForDuplicate = items.filter(
      (item) => item.name.toLowerCase() === currentItem.toLowerCase()
    );
    if (checkListForDuplicate.length > 0) {
      return;
    }
    const { data, error } = await supabase
      .from("items")
      .insert({ name: currentItem, quantity: 1 })
      .select();
    const massagedData = massageDataTool(data)[0];
    setItems([...items, massagedData]);
    setCurrentItem("");
    setTotal(total + 1); // refactor to count items + quantities
    setUpdates(true);
  };

  useEffect(() => {
    async function fetchAndRenderData() {
      const { data, error } = await supabase.from("items").select();
      let massagedData = massageDataTool(data);
      setItems(massagedData);
    }
    fetchAndRenderData();
  }, []);

  useEffect(() => {
    let newTotal = 0;
    items.forEach((elem, idx) => {
      newTotal += elem.quantity;
      setTotal(newTotal);
    });
    // todo: add unsaved to total as well
  }, [items]);
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {total > 0 ? <p className="list-total">Total: {total}</p> : <></>}
      </div>
    </div>
  );
}

export default App;
