import "./item.css";
import { useState } from "react";
function Item({ index, name, setTotal, total, items, setItems }) {
  const [count, setCount] = useState(1);
  const [complete, setComplete] = useState(false);
  const handleComplete = () => {
    setComplete(!complete);
    let element = document.getElementById(`itemName${index}`);
    element.classList.toggle("completed");
  };

  const handleCounterDown = () => {
    if (count < 2) {
      return;
    }
    setCount(count - 1);
    setTotal(total - 1);
  };

  const handleCounterUp = () => {
    setCount(count + 1);
    setTotal(total + 1);
  };
  const handleRemoveItem = () => {
    console.log(items);
    let newList = items.filter((item) => {
      return item !== name;
    });
    setItems(newList);
    setTotal(total - count);
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
      <hr></hr>
    </>
  );
}

export default Item;
