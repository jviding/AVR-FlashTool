interface MCULib {
    mcu: string,
    lib: string
}

const Code = {

    getTargetOrDefaultMCULib: (mcuLibs: MCULib[], code: string) => {
        try {
            // First line in a file should be:
            // ; *** Target MCU: <TargetMCU> ***
            const MCU = code.split('\n')[0].split(' ')[4]
            const MCU_LIB = mcuLibs.find((mcuLib) => { return mcuLib.mcu == MCU })
            if (!!MCU_LIB) {
                return MCU_LIB
            } else {
                throw "MCU not set or was unknown"
            }
        } catch {
            return { mcu: 'ATtiny85', lib: 'tn85def.inc' }
        }
    },

    getDefaultReadOnlyCode: (mcuLib: MCULib) => {
        return [
            `; *** Target MCU: ${mcuLib.mcu} ***`,
            '.nolist',
            `.include "${mcuLib.lib}"`,
            '.list',
            '',
        ].reduce((res, line) => { return res + line + '\n' }, '')
    },

    getActualOrDefaultEditableCode: (code: string) => {
        const LINES = code.split('\n')
        if (LINES.length > 5) {
            return LINES.slice(6).reduce((res, line) => { return res + '\n' + line }, LINES[5])
        } else {
            return 'main:\n; *** Write your code here ***'
        }
    }

}

export default Code