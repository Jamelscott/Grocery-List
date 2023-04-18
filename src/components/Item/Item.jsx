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
  complete,
}) {
  // const [count, setCount] = useState(quantity);
  // console.log("also rerendered", count ? count : "")
  const [isComplete, setIsComplete] = useState(complete); // Use isComplete as state variable

  const handleComplete = () => {
    setIsComplete(!isComplete)
    items.forEach((elem) => {
      if (elem.name === name) {
        elem.complete = !elem.complete;
      }
    });
    setUpdates(true);
  };

  const handleIconChange = () => {
    let iconChange = document.getElementById("saved");
    iconChange.src = bookmarkAdd;
  };

  const handleCounterDown = () => {
    if (quantity < 2) {
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
    // quantity = quantity - 1
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

    setItems(updatedList);
    // quantity = quantity + 1;
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
    setTotal(total - quantity);
    setUpdates(true);
  };
  const handleCheckedItem = ()=>{
    complete = !complete
    if(complete){
      return true
    }
    return false
  }  
  
  return (
    <>
      <div className="item-container">
        <div className="counter-info">
          <input
            className="item-checkbox"
            type="checkbox"
            onChange={handleComplete}
            checked={isComplete}
          ></input>
          <p
            className={`counter-name${isComplete ? " completed" : ""}`}
            id={`itemName${index}`}
          >
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
          <p className="counter-number">{quantity}</p>
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
