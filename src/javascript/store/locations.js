import getLocations from "../sevices/locations.service";

class Locations {
    constructor() {
        this.countries = null;
        this.countriesList = null;
        this.cities = null;
    }

    async init() {
        this.countries = await this.serializeCountries();

        this.countriesList = this.createCountriesList(this.countries);
    }

    createCountriesList(countries) {
        return [...Object.values(countries)];
    }

    async serializeCountries() {
        return await getLocations.countries();
    }

    async serializeCitiesByCode(index) {
        return await getLocations.cities(index);
    }

    async getCountryCodeByName(country) {
        const index = Object.keys(this.countries).find(
            (key) => this.countries[key] === country
        );

        this.cities = await this.serializeCitiesByCode(index);
    }
}

const locations = new Locations();

export default locations;
