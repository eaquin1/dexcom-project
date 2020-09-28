import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Api from "../Helpers/api";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        height: 100,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    itemContainer: {
        alignItems: "center",
    },
}));

function FoodForm({ addItem, submit }) {
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
            foodId: foodItem.hints[0].food.foodId,
        });

        addItem(carbRes, foodItem.text);
        setFoodItem(null);
        submit();
    };

    const cancel = () => {
        setFoodItem(null);
    };

    return foodItem === null ? (
        <Grid container className={classes.paper}>
            <Grid item>
                <form>
                    <label htmlFor="food">Food</label>
                    <input
                        id="food"
                        name="food"
                        ref={register({
                            required: true,
                            pattern: /^[A-Za-z\s]+$/i,
                        })}
                    />
                    {errors.food && "Please enter a food"}
                    <Button onClick={handleSubmit(onSubmit)}>
                        Add a food!
                    </Button>
                </form>
            </Grid>
        </Grid>
    ) : (
        <div className={classes.paper}>
            <form>
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
                <Button onClick={handleSubmit(onQtySubmit)}>
                    Submit Amount
                </Button>
            </form>
            <Button onClick={cancel}>Cancel</Button>
        </div>
    );
}

export default FoodForm;
