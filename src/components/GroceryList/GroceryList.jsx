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
import { CiUndo } from "react-icons/ci";

function GroceryList() {
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
    console.log("items") //CHANGES FROM JON
    console.log(items) //CHANGES FROM JON
    console.log("snapshot") //CHANGES FROM JON
    console.log(snapshot) //CHANGES FROM JON
  }, [items]);

  const handleSaveList = () => {
    if (updates) {
      axios.post("http://localhost:2996/", items).then((response) => {
        console.log(response.data);
      });
      let iconChange = document.getElementById("saved");
      iconChange.src = bookmarkGreenCheck;
      setSnapshot(items) //CHANGES FROM JON
      setUpdates(false);
    } else {
      return;
    }
  };

  const handleUndo = () => {
    axios
      .get("http://localhost:2996/")
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    let iconChange = document.getElementById("saved");
    iconChange.src = bookmarkGreenCheck;
    setUpdates(false);
  }
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
          <div style={{ display: "flex", gap: "5px" }}>
            {total > 0 ? (
              <>
                <img
                  class="dropShadow"
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
                  class="dropShadow"
                  onClick={handleSaveList}
                  id="saved"
                  src={bookmarkConfirm}
                  alt="save state"
                  width="40px"
                />
              </>
            )}
          </div>
          {/* changes from JON */}
          <div style={{ display: "flex", gap: "5px" }}>
            {total > 0 ? (
              <>
                <CiUndo
                  style={{
                    width: "40px",
                    height: "40px",
                    color: "white",
                  }}
                  class="dropShadow"
                  onClick={handleUndo}
                  id="undo"
                  alt="undo state"

                />
              </>
            ) : (
              <>
                <CiUndo
                  style={{
                    width: "40px",
                    height: "40px",
                    color: "black"
                  }}
                  class="dropShadow"
                  // onClick={handleUndo}
                  id="undo"
                  alt="undo state"
                />
              </>
            )}
          </div>
          {total > 0 ? (
            <p className="dropShadow list-total">Total: {total}</p>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div style={{ position: "absolute", top: 20, left: 20 }}>
        <Link to="/">Login page</Link>
      </div>
    </>
  );
}

export default GroceryList;
