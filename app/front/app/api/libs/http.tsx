interface HTTP {
    makeRequest(method: string, url: string): Promise<string>,
    get(url: string): Promise<string>,
    post(url: string, body: object): Promise<string>,
    put(url: string): Promise<string>,
    delete(url: string): Promise<string>
}

const HTTP: HTTP = {

    makeRequest: (method, url) => {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest()

            req.open(method, url)
            req.send()

            req.onreadystatechange = () => {
                if (req.readyState === 4 && req.status === 200) {
                    resolve(req.responseText)
                } else if (req.readyState === 4 && req.status !== 200) {
                    reject(req.responseText)
                }
            }
        })
    },

    get: (url) => {
        return HTTP.makeRequest("GET", url)
    },

    post: () => {
        console.log('TODO: BODY at POST')
        return Promise.resolve("asd")
        //return HTTP.makeRequest("POST", url)
    },

    put: () => {
        return Promise.resolve("asd")
    },

    delete: () => {
        return Promise.resolve("asd")
    }

}

export default HTTP