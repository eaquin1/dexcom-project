import React, { useState } from "react";
import FoodForm from "./FoodForm";
import Api from "../Helpers/api";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { Select, MenuItem, Icon } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Meal from "./Meal";

//import "react-datepicker/dist/react-datepicker-cssmodules.css";

const defaultValues = {
    Select: "breakfast",
    ReactDatepicker: Date.now(),
};
function MealForm({ mealsHandler }) {
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
        };
        //save meal to database
        try {
            await Api.addMeal(saveMeal, foodArray);
        } catch (e) {
            console.log(e);
        }
        //pass meal to PrivateLanding
        mealsHandler(saveMeal);
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

    // const modal = forwardRef((props, ref) => (

    // ))
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <section>
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
                        //defaultValue="breakfast"
                        //ref={register}
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
            <Icon color="secondary" onClick={handleOpen}>
                add_circle
            </Icon>
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="add-food"
                // container={() => rootRef.current}
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
