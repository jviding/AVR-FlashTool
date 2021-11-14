const API = {

    getMCULibs: () => {
        const MCU_LIBS = [
            {
                mcu: 'ATtiny85',
                lib: 'at85def.asm'
            },
            {
                mcu: 'ATtiny45',
                lib: 'at45def.asm'
            },
            {
                mcu: 'SomeX',
                lib: 'atXXdef.asm'
            }
        ]
        return Promise.resolve(MCU_LIBS)
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
        console.log(filename)
        return Promise.resolve('')
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