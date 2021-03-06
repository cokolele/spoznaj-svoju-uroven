const fetchErrorDefault = (e) => {
    console.error("API call error:", e);
    return {
        response: {
            status: -1
        }
    };
}

const base = process.env.NODE_ENV == "production" ? "http://api.programator.sk" : "/api";

const get = async (resource = "/", contentType = "application/json") => {
    try {
        const options = {
            method: "GET",
            headers: {
                Accept: contentType
            },
        };

        const response = await fetch(base + resource, options);
        let json, blob;

        if (contentType == "application/json")
            json = await response.json();
        else
            blob = await response.blob()

        return { response, json, blob };
    } catch (e) {
        return fetchErrorDefault(e);
    }
};

const post = async (resource = "/", body = {}, contentType = "application/json") => {
    try {
        const options = {
            method: "POST",
            headers: {},
            body: contentType == "application/json" ? JSON.stringify(body) : body
        };

        if (contentType) {
            options.headers = {
                ...options.headers,
                "Content-Type": contentType
            };
        }

        const response = await fetch(base + resource, options);
        const json = await response.json();

        return { response, json };
    } catch (e) {
        return fetchErrorDefault(e);
    }
}

const put = async (resource = "/", body = {}, contentType = "application/json") => {
    try {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": contentType
            },
            body: contentType == "application/json" ? JSON.stringify(body) : body
        };

        const response = await fetch(base + resource, options);
        const json = await response.json();

        return { response, json };
    } catch (e) {
        return fetchErrorDefault(e);
    }
}

const patch = async (resource = "/", body = {}, contentType = "application/json") => {
    try {
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": contentType
            },
            body: contentType == "application/json" ? JSON.stringify(body) : body
        };

        const response = await fetch(base + resource, options);
        const json = await response.json();

        return { response, json };
    } catch (e) {
        return fetchErrorDefault(e);
    }
}

const delete_ = async (resource = "/") => {
    try {
        const options = {
            method: "DELETE",
            credentials: "include"
        };

        const response = await fetch(base + resource, options);
        const json = await response.json();

        return { response, json };
    } catch (e) {
        return fetchErrorDefault(e);
    }
};

export default {
    get,
    post,
    put,
    patch,
    delete: delete_
};

export {
    base
}
