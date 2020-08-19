import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

class Api {
    static async sugars() {
        let res = await axios.get(`${BASE_URL}/data/egvs`, {
            withCredentials: true,
            origin: true,
        });

        console.log("res", res.data.egvs);
        return res.data.egvs;
    }

    static async events() {
        let res = await axios.get(`${BASE_URL}/data/events`, {
            withCredentials: true,
            origin: true,
        });

        return res.data.events;
    }

    static async carbs() {
        let res = await axios.get(`${BASE_URL}/data/carbs`, {
            withCredentials: true,
            origin: true,
        });

        return res;
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
}

export default Api;
