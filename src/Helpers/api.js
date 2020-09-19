import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
const instance = axios.create({
    withCredentials: true,
    origin: true,
    baseURL: BASE_URL,
});
class Api {
    static async sugars(dates) {
        let res = await instance.get(`/data/egvs`, {
            params: dates,
        });

        return res.data.egvs;
    }

    static async events() {
        let res = await instance.get(`/data/events`);

        return res.data.events;
    }

    static async foods(item) {
        let res = await instance.get(`/data/foods`, {
            params: item,
        });

        return res.data;
    }

    static async carbs(item) {
        let res = await instance.post(`/data/carbs`, {
            data: {
                item,
            },
        });

        return res.data;
    }

    static async addMeal(meal) {
        let res = await instance.post(`/data/addmeal`, {
            data: { meal },
        });

        return res;
    }

    static async getDataRange() {
        let res = await instance.get(`/data/range`);

        return res.data;
    }

    static async getMealsinTimeRange(dates) {
        let res = await instance.get(`/data/mealsbytime`, {
            params: dates,
        });
        return res.data;
    }

    static async ensureUser() {
        let res = await instance.get(`/auth/user`);
        return res.data;
    }

    static async logoutUser() {
        await instance.get(`auth/logout`);
    }
}

export default Api;
