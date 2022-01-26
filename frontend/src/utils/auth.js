class Auth {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }

    signUp({ password, email }) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
            .then(res => this._getResponseData(res));
    }

    signIn({ password, email }) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
            .then(res => this._getResponseData(res));
    }

    checkToken(JWT) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${JWT}`
            } 
        })
            .then(res => this._getResponseData(res));
    }
}

export const auth = new Auth({
    baseUrl: "https://api.around-15.students.nomoreparties.sbs",
    headers: {        
        "Content-Type": "application/json"
    }
});

export default auth;