import axios from "../plugins/axios";

class GetLocations {
    async countries() {
        try {
            const res = await axios.get("/location/get-countries");
            return res;
        } catch (err) {
            return Promise.reject(err);
        }
    }
    async cities(country) {
        try {
            const res = await axios.get(`location/get-cities/${country}`);
            return res;
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }
}

const getLocations = new GetLocations();

export default getLocations;
