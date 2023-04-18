// add tooltip saying you already have that item when trting to add
// add snapshot funcitonality to allow
import { Link } from "react-router-dom";
import bookmarkAdd from "../../assets/bookmark_add.svg";
import bookmarkConfirm from "../../assets/bookmark_confirm.svg";
import bookmarkGreenCheck from "../../assets/bookmark_greencheck.svg";
import "../../App.css";
import { useState, useEffect } from "react";
import Item from "../Item/Item";
import axios from "axios";
import {io} from 'socket.io-client'


const socket = io('http://localhost:3001')

function GroceryList() {
  const [currentItem, setCurrentItem] = useState("");
  const [updates, setUpdates] = useState(false);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [snapshot, setSnapshot] = useState([]); //set up to mimic items and confir if up to date
  const [newData, setNewData] = useState({})

  socket.on('sending-new-items', items => {
    console.log(items)
    setItems(items)
  })
  const allItems = items.map((elem, idx) => {
    return (
      <Item
        complete={elem.complete}
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
    setItems([...items, { name: currentItem, quantity: 1, complete: false }]);
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
      socket.emit('new-save', items)
    } else {
      return;
    }
  };
  return (
    <>
      <div className="list-container">
        <form
          className=" boxShadow borderRadius10 list-form"
          onSubmit={handleAddItem}
        >
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100px" }}>
            <img
              className="dropShadow"
              onClick={handleSaveList}
              id="saved"
              src={updates ? bookmarkAdd : bookmarkConfirm}
              alt="save state"
              width="40px"
            />
          </div>
          {updates ? (
            <p>unsaved changes</p>
          ) : (
            <p style={{ color: "white" }}>up to date</p>
          )}
          <p className="dropShadow list-total">Total: {total}</p>
        </div>
      </div>
      <div style={{ position: "absolute", top: 20, left: 20 }}>
        <Link to="/">Login page</Link>
      </div>
    </>
  );
}

export default GroceryList;
