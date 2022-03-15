import React, { useState, useEffect } from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import Searchbar from "../Searchbar/Searchbar";
import FoodItems from "../FoodItems/FoodItems";

const Home = () => {
  const [foodData, setFoodData] = useState([]);

  const makeAPICall = async () => {
    try {
      const response = await fetch("http://localhost:4000/food", {
        mode: "cors",
      });
      const data = await response.json();
      setFoodData(data);
    } catch (e) {
      console.log(e);
    }
  };

  const changeFoodData = (data) => {
    setFoodData(data);
  };

  useEffect(() => {
    makeAPICall();
  }, []);

  return (
    <div>
      <Navbar />

      <Searchbar changeFoodData={changeFoodData} />
      <div className="food-item-container">
        {foodData.map((data) => {
          return (
            <FoodItems
              key={data._id}
              description={data.description}
              calories={data.calories}
              carbohydrates={data.carbohydrates}
              protein={data.protein}
              fat={data.fat}
              sugar={data.sugar}
              brandOwner={data.brandOwner}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
