import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

class Api {
    static async sugars(dates) {
        let res = await axios.get(`${BASE_URL}/data/egvs`, {
            withCredentials: true,
            origin: true,
            params: dates,
        });

        return res.data.egvs;
    }

    static async events() {
        let res = await axios.get(`${BASE_URL}/data/events`, {
            withCredentials: true,
            origin: true,
        });

        return res.data.events;
    }

    static async foods(item) {
        let res = await axios.get(`${BASE_URL}/data/foods`, {
            withCredentials: true,
            origin: true,
            params: item,
        });

        return res.data;
    }

    static async carbs(item) {
        let res = await axios.post(`${BASE_URL}/data/carbs`, {
            withCredentials: true,
            origin: true,
            data: {
                item,
            },
        });

        return res.data;
    }

    static async addMeal(meal) {
        let res = await axios(`${BASE_URL}/data/addmeal`, {
            method: "post",
            data: meal,
            withCredentials: true,
            origin: true,
        });

        return res;
    }

    static async getDataRange() {
        let res = await axios.get(`${BASE_URL}/data/range`, {
            withCredentials: true,
            origin: true,
        });

        return res.data;
    }
}

export default Api;
