const lsToketKey = "app_token";

function setTokenOnLogin(res) {
    const isLoginUrl = res.config.url.includes("login");

    if (isLoginUrl) {
        const token = res.data.token;
        localStorage.setItem(lsToketKey, token);
    }

    return res;
}

function getClearResponse(res) {
    return res.data;
}

function setToken(req) {
    const isAuthUrl = req.url.includes("auth");

    if (!isAuthUrl) {
        const token = localStorage.getItem(lsToketKey);
        req.headers["x-access-token"] = token;
    }

    return req;
}

export default function (axios) {
    axios.interceptors.request.use(setToken);
    axios.interceptors.response.use(setTokenOnLogin);
    axios.interceptors.response.use(getClearResponse);
}
