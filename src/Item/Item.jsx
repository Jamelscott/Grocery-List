import "./item.css";
import { useState } from "react";
function Item({ index, name }) {
  const [count, setCount] = useState(1);
  const [complete, setComplete] = useState(false);
  const handleComplete = () => {
    setComplete(!complete);
    let element = document.getElementById(`itemName${index}`);
    element.classList.toggle("completed");
  };

  const handleCounterDown = () => {
    if (count < 1) {
      return;
    }
    setCount(count - 1);
  };
  return (
    <div className="item-container">
      <div className="counter-info">
        <input type="checkbox" onClick={handleComplete}></input>
        <p id={`itemName${index}`}> {name}</p>
      </div>
      <div className="counter-container">
        <button className="counter-button" onClick={() => setCount(count + 1)}>
          +
        </button>
        <p>{count}</p>
        <button className="counter-button" onClick={handleCounterDown}>
          -
        </button>
      </div>
    </div>
  );
}

export default Item;
