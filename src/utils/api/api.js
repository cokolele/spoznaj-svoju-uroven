const fetchErrorDefault = (e) => {
    console.error("API call error:", e);
    return {
        response: {
            status: -1
        }
    };
}

const get = async (resource = "/", contentType = "application/json") => {
    try {
        const options = {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: contentType
            },
        };

        const response = await fetch("/api" + resource, options);
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
            credentials: "include",
            headers: {},
            body: contentType == "application/json" ? JSON.stringify(body) : body
        };

        if (contentType) {
            options.headers = {
                ...options.headers,
                "Content-Type": contentType
            };
        }

        const response = await fetch("/api" + resource, options);
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
            credentials: "include",
            headers: {
                "Content-Type": contentType
            },
            body: contentType == "application/json" ? JSON.stringify(body) : body
        };

        const response = await fetch("/api" + resource, options);
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
            credentials: "include",
            headers: {
                "Content-Type": contentType
            },
            body: contentType == "application/json" ? JSON.stringify(body) : body
        };

        const response = await fetch("/api" + resource, options);
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

        const response = await fetch("/api" + resource, options);
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

const base = "http://api.programator.sk";

export {
    base
}
