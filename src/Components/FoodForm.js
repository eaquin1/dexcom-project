import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Api from "../Helpers/api";
import { Select, MenuItem } from "@material-ui/core";

function FoodForm({ addItem }) {
    const { register, handleSubmit, control } = useForm();
    const [foodItem, setFoodItem] = useState(null);

    const onSubmit = async (item) => {
        let foodRes = await Api.foods(item);
        setFoodItem(foodRes);
    };

    const onQtySubmit = async (qtyItem) => {
        let carbRes = await Api.carbs({
            quantity: qtyItem.amount,
            measureURI: qtyItem.Select,
            foodId: foodItem.parsed[0].food.foodId,
        });

        addItem(carbRes);
        setFoodItem(null);
    };

    const cancel = () => {
        setFoodItem(null);
    };

    return foodItem === null ? (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="food">Food</label>
            <input id="food" name="food" ref={register({ required: true })} />
            <button>Add a food!</button>
        </form>
    ) : (
        <>
            <form onSubmit={handleSubmit(onQtySubmit)}>
                <label htmlFor="Select">Measurement</label>
                <Controller
                    as={
                        <Select>
                            {foodItem.hints[0].measures.map((measure) => (
                                <MenuItem value={measure.uri} key={measure.uri}>
                                    {measure.label}
                                </MenuItem>
                            ))}
                        </Select>
                    }
                    name="Select"
                    id="Select"
                    control={control}
                    defaultValue=""
                />
                <label htmlFor="amount">Amount</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    ref={register({ required: true })}
                />
                <button>Submit Amount</button>
            </form>
            <button onClick={cancel}>Cancel</button>
        </>
    );
}

export default FoodForm;
