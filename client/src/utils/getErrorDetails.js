import config from "../../config"

export const getErrorDetails = (errorCode) => {
    return {
        code: errorCode,
        title: `Error ${errorCode}`,
        message: config.errorMessages[errorCode] || 'An unknown error occurred.'
    }
}