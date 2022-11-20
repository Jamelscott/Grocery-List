// add tooltip saying you already have that item when trting to add
// add snapshot funcitonality to allow
import bookmarkAdd from "../src/bookmark_add.svg";
import bookmarkConfirm from "../src/bookmark_confirm.svg";
import bookmarkGreenCheck from "../src/bookmark_greencheck.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Item from "./Item/Item";
import axios from "axios";

function App() {
  const [currentItem, setCurrentItem] = useState("");
  const [updates, setUpdates] = useState(false);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [snapshot, setSnapshot] = useState([]); //set up to mimic items and confir if up to date

  const allItems = items.map((elem, idx) => {
    return (
      <Item
        quantity={elem.quantity}
        setUpdates={setUpdates}
        items={items}
        total={total}
        setTotal={setTotal}
        setItems={setItems}
        key={`item-${idx + 1}`}
        index={idx}
        name={elem.name}
      />
    );
  });

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!currentItem) return;
    let checkList = items.filter(
      (item) => item.name.toLowerCase() === currentItem.toLowerCase()
    );
    if (checkList.length > 0) {
      return;
    }
    if (document.getElementById("saved").hidden) {
      document.getElementById("saved").hidden = false;
    }
    let iconChange = document.getElementById("saved");
    iconChange.src = bookmarkAdd;
    setItems([...items, { name: currentItem, quantity: 1 }]);
    setCurrentItem("");
    setTotal(total + 1);
    setUpdates(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:2996/")
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let newTotal = 0;
    items.forEach((elem, idx) => {
      // console.log(elem.quantity);
      newTotal += elem.quantity;
      setTotal(newTotal);
    });
  }, [items]);

  const handleSaveList = () => {
    if (updates) {
      axios.post("http://localhost:2996/", items).then((response) => {
        console.log(response.data);
      });
      let iconChange = document.getElementById("saved");
      iconChange.src = bookmarkGreenCheck;
      setUpdates(false);
    } else {
      return;
    }
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "5px" }}>
          {total > 0 ? (
            <>
              <img
                onClick={handleSaveList}
                id="saved"
                src={bookmarkConfirm}
                alt="save state"
                width="40px"
              />
            </>
          ) : (
            <>
              <img
                hidden
                onClick={handleSaveList}
                id="saved"
                src={bookmarkConfirm}
                alt="save state"
                width="40px"
              />
            </>
          )}
          {updates ? (
            <p className="updatesText" style={{ color: "black" }}>
              - unsaved changes
            </p>
          ) : (
            <p className="updatesText">- up to date</p>
          )}
        </div>
        {total > 0 ? <p className="list-total">Total: {total}</p> : <></>}
      </div>
    </div>
  );
}

export default App;
