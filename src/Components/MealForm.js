import React, { useState } from "react";
import FoodForm from "./FoodForm";
import Api from "../Helpers/api";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import AddCircle from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Meal from "./Meal";
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
        display: "flex",
        padding: theme.spacing(1),
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
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
                <section classes={classes.root}>
                    <label>Meal</label>
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
                <button className="button">Add a new meal!</button>
            </form>
            <IconButton onClick={handleOpen}>
                <AddCircle color="secondary" />
            </IconButton>
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="add-food"
                className={classes.modal}
            >
                <div>
                    <FoodForm addItem={addItem} submit={handleClose} />
                </div>
            </Modal>
            <Meal foods={foods} carbCount={meals.carb_count} />
        </div>
    );
}

export default MealForm;
