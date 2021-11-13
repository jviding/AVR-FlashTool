const API = {

    getMCUs: () => {
        return Promise.resolve(true)
    },

    createFile: (filename: string, extension: string) => {
        console.log('Create: ' + filename + '.' + extension)
        return Promise.resolve(filename + '.' + extension)
    },

    deleteFile: (filename: string) => {
        console.log('Delete: ' + filename)
        return Promise.resolve(true)
    },

    getFilenames: () => {
        return Promise.resolve(['file_one.asm', 'file_two.asm', 'file_three.asm'])
    },

    getFileContents: (filename: string) => {
        // If file is still empty
        /*const res = {
            mcuLib: '',
            defaultCode: `; *** This program is written for ${this.state.mcuName} ***
            .nolist
            .include "${this.state.mcuLib}"
            .list
            `,
            code: 'main:\n; *** Write your code here ***'
        }
        console.log(res)*/
        console.log(filename)
        // TODO: Read ;12345 or something from default code and split
        // Return then object { code: x, defaultCode: y }
        return Promise.resolve('main:\n; *** Write your code here ***')
    },

    saveFileContents: () => { // filename: string, contents: string
        // TODO: Write ;12345 or something after default code -> or before?
        // Also write MCU details there so can read from getFileContents
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