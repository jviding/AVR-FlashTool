const API = {

    createFile: (filename: string) => {
        return Promise.resolve(filename + '.asm')
    },

    deleteFile: () => { // filename: string
        return Promise.resolve(true)
    },

    getFilenames: () => {
        return Promise.resolve(['file_one.asm', 'file_two.asm', 'file_three.asm'])
    },

    getFileContents: () => { // filename: string
        return Promise.resolve('asd\nasd\nasd')
    },

    saveFileContents: () => { // filename: string, contents: string
        return Promise.resolve(true)
    },

    buildFile: () => { // filename: string
        return Promise.resolve(true)
    },

    flashFile: () => { // filename: string
        return Promise.resolve(true)
    }
}

export default API