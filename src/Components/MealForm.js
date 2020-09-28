import React, { useState } from "react";
import FoodForm from "./FoodForm";
import Meal from "./Meal";
import Api from "../Helpers/api";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import AddCircle from "@material-ui/icons/AddCircle";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import Chip from "@material-ui/core/Chip";

import { makeStyles } from "@material-ui/core/styles";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const defaultValues = {
    Select: "breakfast",
    ReactDatepicker: Date.now(),
};

const useStyles = makeStyles((theme) => ({
    root: {
        height: 300,
        flexGrow: 1,
        minWidth: 300,
        transform: "translateZ(0)",
        // The position fixed scoping doesn't work in IE 11.
        // Disable this demo to preserve the others.
        "@media all and (-ms-high-contrast: none)": {
            display: "none",
        },
    },
    modal: {
        position: "absolute",
        display: "flex",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%)`,
        padding: theme.spacing(1),
        alignItems: "center",
        justifyContent: "center",
    },
}));

function MealForm({ mealsHandler }) {
    const classes = useStyles();
    //eslint-disable-next-line
    const { handleSubmit, register, control } = useForm({ defaultValues });
    const INITIAL_STATE = { name: "", time: null, carb_count: 0 };
    const [foods, setFoods] = useState([]);
    const [meals, setMeals] = useState(INITIAL_STATE);
    const [open, setOpen] = useState(false);

    const onSubmit = async (curMeal) => {
        setMeals((prevMeals) => ({
            ...prevMeals,
            name: curMeal.Select,
            time: curMeal.ReactDatepicker,
        }));

        const foodArray = foods.map((food) => food.name);
        const saveMeal = {
            name: curMeal.Select,
            date: curMeal.ReactDatepicker,
            carb_count: meals.carb_count,
            foods: foodArray,
        };
        //save meal to database
        try {
            await Api.addMeal(saveMeal);
        } catch (e) {
            console.log(e);
        }
        //pass meal to PrivateLanding
        mealsHandler(saveMeal);
        setMeals(INITIAL_STATE);
        setFoods([]);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addItem = (item, itemName) => {
        let nutrients = {
            name: itemName,
            serving: `${item.totalWeight} g`,
            calories: item.calories,
            carbs:
                item.totalNutrients.CHOCDF.quantity.toFixed(1) +
                item.totalNutrients.CHOCDF.unit,
            fat:
                item.totalNutrients.FAT.quantity.toFixed(1) +
                item.totalNutrients.FAT.unit,
            protein:
                item.totalNutrients.PROCNT.quantity.toFixed(1) +
                item.totalNutrients.PROCNT.unit,
        };
        setMeals((prevMeals) => ({
            ...prevMeals,
            carb_count: Math.round(
                meals.carb_count + item.totalNutrients.CHOCDF.quantity
            ),
        }));
        setFoods((food) => [...foods, { ...nutrients }]);
    };

    return (
        <div>
            <h1>Add a Meal</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <section className={classes.root}>
                    <Controller
                        as={
                            <Select>
                                <MenuItem value="breakfast">Breakfast</MenuItem>
                                <MenuItem value="lunch">Lunch</MenuItem>
                                <MenuItem value="dinner">Dinner</MenuItem>
                                <MenuItem value="snack">Snack</MenuItem>
                            </Select>
                        }
                        name="Select"
                        control={control}
                    />
                </section>
                <Controller
                    control={control}
                    name="ReactDatepicker"
                    render={({ onChange, onBlur, value }) => (
                        <DatePicker
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            defaultValue={Date.now()}
                            showTimeSelect
                            timeIntervals={15}
                            timeCaption="Time"
                        />
                    )}
                />

                <Chip
                    label="Add a Food"
                    onClick={handleOpen}
                    icon={<AddCircle />}
                    color="secondary"
                />

                <Meal foods={foods} carbCount={meals.carb_count} />
                <button className="button">Add a new meal!</button>
            </form>

            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="add-food"
            >
                <div className={classes.modal}>
                    <FoodForm
                        // className={classes.paper}
                        addItem={addItem}
                        submit={handleClose}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default MealForm;
