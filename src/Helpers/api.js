import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

class Api {
    static async sugars() {
        console.log(document.cookie);
        let res = await axios.get(`${BASE_URL}/data/egvs`);
        return res.data;
    }
}

export default Api;
