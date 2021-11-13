export function isValidFilename(filename: string): Promise<string> {

    const validateLength = () => {
        if (filename.length >= 3 && filename.length <= 24) {
            return Promise.resolve(filename)
        }
        return Promise.reject('Filename should be from 3 to 24 characters!')
    }

    const validateFormat = () => {
        const regex = new RegExp('^[a-zA-Z0-9_-]*$')
        if (regex.test(filename)) {
            return Promise.resolve(filename)
        }
        return Promise.reject('Filename should contain only [ a-z A-Z 0-9 _ - ]!')
    }

    return validateLength().then(validateFormat)
}