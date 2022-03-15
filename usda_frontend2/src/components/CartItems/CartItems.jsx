import React, { useState } from "react";
import axios from "axios";
import "./CartItems.css";
import { useNavigate } from "react-router-dom";

const CartItems = (props) => {
  //   const [object, setObject] = useState({
  //     calories: props.calories,
  //     description: props.description,
  //     protein: props.protein,
  //     carbohydrates: props.carbohydrates,
  //     fat: props.fat,
  //     sugar: props.sugar,
  //     brandOwner: props.brandOwner,
  //   });
  const navigate = useNavigate();

  const description = { description: props.description };
  const [showDetails, setShowDetails] = useState(false);

  const postFoodItemData = async () => {
    const response = await axios.post(
      "http://localhost:4000/cart/removeFromCart",
      description
    );
    const data = await response.data;
    navigate("/");
  };

  return (
    <div className="food-items">
      <div className="food-item-header">
        <h3
          onClick={() => {
            setShowDetails(!showDetails);
            console.log(showDetails);
          }}
        >
          {props.description}
        </h3>
      </div>

      {showDetails && (
        <div className="food-item-details">
          <p>Calories: {props.calories}kcal</p>
          <p>Protein: {props.protein}g</p>
          <p>Carbs: {props.carbohydrates}g</p>
          <p>Fat: {props.fat}g</p>
          <p>Sugar: {props.sugar}g</p>
        </div>
      )}

      <button className="remove-from-cart-button" onClick={postFoodItemData}>
        Remove from cart
      </button>
    </div>
  );
};

export default CartItems;
