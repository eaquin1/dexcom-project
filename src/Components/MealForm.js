import React, { useState } from "react";
import FoodForm from "./FoodForm";
import Api from "../Helpers/api";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { Select, MenuItem, Menu, Icon, Button } from "@material-ui/core";
//import "react-datepicker/dist/react-datepicker-cssmodules.css";

const defaultValues = {
    Select: "breakfast",
};
function MealForm() {
    const { handleSubmit, register, control } = useForm({ defaultValues });
    const INITIAL_STATE = { name: "", time: null, foods: [] };
    const [meal, setMeal] = useState(INITIAL_STATE);

    const onSubmit = (evt) => {
        console.log(evt);
        // try {
        //     await Api.addMeal(meal);
        // } catch (e) {
        //     console.log(e);
        // }
    };

    // const handleChange = (evt) => {
    //     const { name, value } = evt.target;
    //     setMeal((meal) => ({
    //         ...meal,
    //         [name]: value,
    //     }));
    //     console.log(meal);
    // };
    const addItem = (item) => {
        console.log(item.totalNutrients.CHOCDF);
    };
    return (
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
                as={DatePicker}
                control={control}
                valueName="selected"
                onChange={([selected]) => selected}
                name="datePicker"
                defaultValue={Date.now()}
                showTimeSelect
                timeIntervals={15}
                timeCaption="Time"
                //dateFormat="h:mm aa"
                placeholderText="Choose a mealtime"
            />
            <Icon color="secondary">add_circle</Icon>
            <FoodForm addItem={addItem} />
            {/* <input
                id="name"
                name="name"
                value={meal.name}
                onChange={handleChange}
            /> */}

            {/* <label htmlFor="qty">Qty:</label>
            <input
                type="number"
                id="qty"
                name="qty"
                value={formData.qty}
                onChange={handleChange}
            /> */}

            <button className="button">Add a new meal!</button>
        </form>
    );
}

export default MealForm;
