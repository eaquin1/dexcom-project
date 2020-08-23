import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Api from "../Helpers/api";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function FoodForm({ addItem }) {
    const classes = useStyles();
    const { register, handleSubmit, control, errors } = useForm();
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

        addItem(carbRes, foodItem.text);
        setFoodItem(null);
    };

    const cancel = () => {
        setFoodItem(null);
    };

    return foodItem === null ? (
        <div className={classes.paper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="food">Food</label>
                <input
                    id="food"
                    name="food"
                    ref={register({ required: true, pattern: /^[A-Za-z]+$/i })}
                />
                {errors.food && "Please enter a food"}
                <button>Add a food!</button>
            </form>
        </div>
    ) : (
        <div className={classes.paper}>
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
                {errors.amount && "Please enter an amount"}
                <button>Submit Amount</button>
            </form>
            <button onClick={cancel}>Cancel</button>
        </div>
    );
}

export default FoodForm;
