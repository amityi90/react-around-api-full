class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    setBaseUrl(baseUrl) {
        this._baseUrl = baseUrl;
    }

    setHeaders(headers) {
        this._headers = headers;
    }

    addToken(token) {
        this._headers = {
            ...this._headers,
            "Authorization": `Bearer ${token}`
        }
        console.log(this._headers);
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }

    getInitialCards() {
        return fetch((`${this._baseUrl}/cards`), {
            headers: this._headers
        })
            .then(res => this._getResponseData(res));
    }

    getUserInfo() {
        return fetch((`${this._baseUrl}/users/me`), {
            headers: this._headers
        })
            .then(res => this._getResponseData(res));
    }

    postCard(card) {
        console.log(card);
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link,
                owner: card.owner
            })
        })
            .then(res => this._getResponseData(res));
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(res => this._getResponseData(res));
    }

    makeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers
        })
            .then(res => this._getResponseData(res));
    }

    makeUnlike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(res => this._getResponseData(res));
    }

    changeProfilePicture({ picture }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: picture
            })
        })
            .then(res => this._getResponseData(res));
    }

    setUserInfo({ name, profession }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: profession
            })
        })
            .then(res => this._getResponseData(res));
    }

    changeLikeCardStatus(cardId, isLiked) {

        if (isLiked) {
            return this.makeUnlike(cardId);
        } else {

            return this.makeLike(cardId);
        }
    }
}

export const api = new Api({
    baseUrl: "https://api.around-15-2.students.nomoreparties.sbs",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;
