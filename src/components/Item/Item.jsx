import "./item.css";
import { useState } from "react";
import bookmarkAdd from "../../assets/bookmark_add.svg";
function Item({
  index,
  name,
  setTotal,
  total,
  items,
  setItems,
  quantity,
  setUpdates,
}) {
  const [count, setCount] = useState(quantity);
  const [complete, setComplete] = useState(false);
  const handleComplete = () => {
    setComplete(!complete);
    let element = document.getElementById(`itemName${index}`);
    element.classList.toggle("completed");
  };

  const handleIconChange = () => {
    let iconChange = document.getElementById("saved");
    iconChange.src = bookmarkAdd;
  };

  const handleCounterDown = () => {
    if (count < 2) {
      return;
    }
    const updatedList = items.map((elem, idx) => {
      if (elem.name === name) {
        elem.quantity -= 1;
        return elem;
      } else {
        return elem;
      }
    });
    handleIconChange();
    setCount(count - 1);
    setTotal(total - 1);
    setUpdates(true);
  };

  const handleCounterUp = () => {
    let iconChange = document.getElementById("saved");
    iconChange.src = bookmarkAdd;
    const updatedList = items.map((elem, idx) => {
      if (elem.name === name) {
        elem.quantity += 1;
        return elem;
      } else {
        return elem;
      }
    });
    // console.log(updatedList);
    setItems(updatedList);
    setCount(count + 1);
    setTotal(total + 1);
    setUpdates(true);
  };
  const handleRemoveItem = () => {
    let newList = items.filter((item) => {
      return item.name != name;
    });
    console.log(newList);
    handleIconChange();
    setItems(newList);
    setTotal(total - count);
    setUpdates(true);
  };
  return (
    <>
      <div className="item-container">
        <div className="counter-info">
          <input
            className="item-checkbox"
            type="checkbox"
            onClick={handleComplete}
          ></input>
          <p className="counter-name" id={`itemName${index}`}>
            {" "}
            {name}
          </p>
        </div>
        <div className="counter-container">
          <button className="counter-remove" onClick={handleRemoveItem}>
            x
          </button>
          <div style={{ width: "10px" }}></div>
          <button
            className="counter-button counter-button-right"
            onClick={handleCounterDown}
          >
            {"<"}
          </button>
          <p className="counter-number">{count}</p>
          <button className="counter-button" onClick={handleCounterUp}>
            {">"}
          </button>
          <p>{""}</p>
        </div>
      </div>
      <hr className="whiteLine"></hr>
    </>
  );
}

export default Item;
