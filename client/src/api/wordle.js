import axiosClient from './index'

const wordle = {
    getPossibleAnswers: () => {
        const url = '/possibleAnswers'
        return axiosClient.get(url)
    },

    getTopAnswers: () => {
        const url = '/topAnswers'
        return axiosClient.get(url)
    },

    restart: () => {
        const url = '/restart'
        return axiosClient.get(url)
    },

    changeMode: (mode) => {
        const url = '/changeMode'
        return axiosClient.post(url, {mode: mode})
    },

    validate: (guess, pattern) =>{
        const message = {
            guess: guess,
            pattern: pattern
        }

        const url = '/validate'

        return axiosClient.post(url, message)

    }
}

export default wordle
