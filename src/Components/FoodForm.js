import React, { useState } from "react";
function FoodForm({ addItem }) {
    const [foodItem, setFoodItem] = useState("");
    const handleSubmit = (evt) => {};

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name"> :</label>
            <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />

            <label htmlFor="qty">Qty:</label>
            <input
                type="number"
                id="qty"
                name="qty"
                value={formData.qty}
                onChange={handleChange}
            />

            <button>Add a new meal!</button>
        </form>
    );
}

export default FoodForm;
