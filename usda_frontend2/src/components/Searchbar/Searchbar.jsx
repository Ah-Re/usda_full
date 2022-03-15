import React, { useState, useEffect } from "react";
import "./Searchbar.css";
import axios from "axios";

const Searchbar = (props) => {
  const [foodPick, setFoodPick] = useState("");
  //   const [foodData, setFoodData] = useState([]);

  const makeAPIFoodCall = async () => {
    try {
      const response = await fetch("http://localhost:4000/food/" + foodPick, {
        mode: "cors",
      });
      const data = await response.json();
      props.changeFoodData(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    makeAPIFoodCall();
  };

  const handleChange = (e) => {
    setFoodPick(e.target.value);
  };

  return (
    <div className="searchbar">
      <div className="search-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleChange}
            className="search-input"
            name="foodPick"
            value={foodPick || ""}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Searchbar;
