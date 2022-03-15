import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import CartItems from "../CartItems/CartItems";
import "./Cart.css";

const Cart = () => {
  const [foodData, setFoodData] = useState([]);
  const [dataChange, setDataChange] = useState(false);

  let calories = 0;
  for (let i = 0; i < foodData.length; i++) {
    calories = calories + parseInt(foodData[i].calories);
  }
  console.log(calories);

  const makeAPICall = async () => {
    try {
      const response = await fetch("http://localhost:4000/cart", {
        mode: "cors",
      });
      const data = await response.json();
      setFoodData(data);
    } catch (e) {
      console.log(e);
    }
  };

  const dataHasChanged = () => {
    setDataChange(!dataChange);
  };

  console.log(foodData._id);
  useEffect(() => {
    makeAPICall();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center", marginTop: "3rem" }}>
        Calorie Count: {calories}
      </h1>
      {foodData.map((data) => {
        return (
          <div className="food-item-container-cart">
            <CartItems
              key={data._id}
              id={data._id}
              description={data.description}
              calories={data.calories}
              carbohydrates={data.carbohydrates}
              protein={data.protein}
              fat={data.fat}
              sugar={data.sugar}
              brandOwner={data.brandOwner}
              dataHasChanged={dataHasChanged}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
