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

    getFilenames: () => {
        return Promise.resolve(['file_one.asm', 'file_two.asm', 'file_three.asm'])
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
        return Promise.resolve('BuiltBuiltBuiltBuiltBuiltBuiltBuiltBuiltBuiltBuiltBuiltBuiltBuiltBuiltBuiltBuiltBuiltBuiltBuiltBuiltBuiltBuilt')
    },

    flashFile: (filename: string, contents: string) => {
        console.log('Flash ' + filename + ':\n' + contents)
        return Promise.resolve('FlashedFlashedFlashedFlashedFlashedFlashedFlashedFlashedFlashedFlashedFlashedFlashedFlashedFlashedFlashedFlashedFlashedFlashed')
    }
}

export default API