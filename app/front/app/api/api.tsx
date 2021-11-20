import HTTP from './libs/http'
const API_URL = 'http://localhost:8080/api'

// TODO: Use interface -> const API: API = { ...
interface API {
    getMcuLibs(): Promise<[{ mcu: string, lib: string }]>,
    getFilenames(): Promise<string[]>
}

const API = {

    getMCULibs: () => {
        const URL = API_URL + '/mcuLibs'
        return HTTP.get(URL).then((res) => { return JSON.parse(res).mcuLibs })
    },

    getFilenames: () => {
        const URL = API_URL + '/filenames'
        return HTTP.get(URL).then((res) => { return JSON.parse(res).filenames })
    },

    getFile: (filename: string) => {
        console.log(filename)
        return Promise.resolve('')
    },

    createFile: (filename: string, extension: string) => {
        console.log('Create: ' + filename + '.' + extension)
        return Promise.resolve(filename + '.' + extension)
    },

    deleteFile: (filename: string) => {
        console.log('Delete: ' + filename)
        return Promise.resolve(true)
    },

    saveFile: (filename: string, contents: string) => {
        console.log('Save ' + filename + ':\n' + contents)
        return Promise.resolve('Saved')
    },

    buildFile: (filename: string, contents: string) => {
        console.log('Build ' + filename + ':\n' + contents)
        return Promise.resolve('Built')
    },

    flashFile: (filename: string, contents: string) => {
        console.log('Flash ' + filename + ':\n' + contents)
        return Promise.resolve('Flashed')
    }
}

export default API