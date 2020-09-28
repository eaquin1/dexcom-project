import React, { useEffect, useState } from "react";
import Api from "../Helpers/api";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { format } from "date-fns";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function MealList() {
    const [allMeals, setAllMeals] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        async function getAllMeals() {
            let resp = await Api.getAllUserMeals();
            let sortedByDate = resp.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
            setAllMeals(sortedByDate);
        }
        getAllMeals();
    }, []);

    const deleteMeal = async (id) => {
        await Api.deleteMeal(id);
        const deleted = allMeals.filter((meal) => id !== meal.id);
        setAllMeals(deleted);
    };

    return allMeals.length === 0 ? (
        <h1>No meals added yet </h1>
    ) : (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="meal table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Foods</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allMeals.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {format(
                                    new Date(row.date),
                                    "MM/dd/yyyy h:mm aaaa"
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {row.foods.map((food) => (
                                    <p key={food}>{food}</p>
                                ))}
                            </TableCell>
                            <TableCell align="right">
                                {row.carb_count} grams
                            </TableCell>
                            <TableCell align="right">
                                <Button
                                    key={row.id}
                                    onClick={() => deleteMeal(row.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default MealList;
