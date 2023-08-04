class TasksApi {
    constructor() {
        this.url = 'http://localhost:3005/data'
    }

    load() {
        return this._fetch()
    }

    add(data) {
        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }
        return this._fetch(options)
    }

    update(data, id) {
        const options = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }
        return this._fetch(options, `/${id}`)
    }

    _fetch(options, id = '') {
        return fetch(this.url + id, options)
            .then(resp => {
                if (resp.ok) return resp.json()
                else Promise.reject(resp)
            })
    }
}

export default TasksApi