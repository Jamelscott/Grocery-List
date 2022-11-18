import "./item.css";
import whiteClose from "../assets/white-close.png";
import oJClose from "../assets/oj-close.png";
import { useState } from "react";
import bookmarkAdd from "../../src/bookmark_add.svg";
import { supabase } from "../supabaseClient";

function Item({
  index,
  name,
  setTotal,
  total,
  items,
  setItems,
  quantity,
  massageDataTool,
}) {
  const [count, setCount] = useState(quantity);
  const [complete, setComplete] = useState(false);
  const [hovering, setHovering] = useState(false);

  const handleComplete = () => {
    setComplete(!complete);
    let element = document.getElementById(`itemName${index}`);
    element.classList.toggle("completed");
  };

  const handleIconChange = () => {
    let iconChange = document.getElementById("saved");
    iconChange.src = bookmarkAdd;
  };

  const handleCounterDown = async () => {
    if (count < 2) {
      return;
    }
    quantity += 1;
    const { data1, error2 } = await supabase
      .from("items")
      .update({ quantity: quantity })
      .eq("name", name);
    const { data, error } = await supabase.from("items").select();
    const massagedData = massageDataTool(data);
    setItems(massagedData);
    setCount(count - 1);
    setTotal(total - 1);
  };

  const handleCounterUp = async () => {
    items.forEach((elem, idx) => {
      if (elem.name === name) {
        elem.quantity += 1;
      }
    });
    const { data2, error2 } = await supabase
      .from("items")
      .update({ quantity: quantity })
      .eq("name", name);
    console.log(data2, error2);
    const { data, error } = await supabase.from("items").select();
    const massagedData = massageDataTool(data);
    console.log(massagedData);
    setItems(massagedData);
    setCount(count + 1);
    setTotal(total + 1);
  };

  const handleRemoveItem = async () => {
    const { deleteData, deleteError } = await supabase
      .from("items")
      .delete()
      .eq("name", name);
    const { data, error } = await supabase.from("items").select();
    const massagedData = massageDataTool(data);
    setItems(massagedData);
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
          <div className="counter-remove" onClick={handleRemoveItem}>
            {hovering ? (
              <img src={whiteClose} alt="close-button" />
            ) : (
              <img src={oJClose} alt="close-button" />
            )}
          </div>
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
