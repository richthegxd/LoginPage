import axios from "../plugins/axios";

async function login({ email, password } = {}) {
    try {
        const res = await axios.post(
            `/auth/login`,
            JSON.stringify({
                email,
                password,
            })
        );

        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function register(data) {
    try {
        const res = await axios.post(`/auth/signup`, JSON.stringify(data));
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
}

export { login, register };
