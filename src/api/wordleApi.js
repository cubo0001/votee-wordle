import axiosClient from "./axiosClient";

const wordleApi = {
    dailyGetRequest: (wordToGuess) => axiosClient.get("/daily" + `?guess=${wordToGuess}`),
    randomGetRequest: (wordToGuess, seed) => axiosClient.get("/random" + `?guess=${wordToGuess}&seed=${seed}`),
    wordGetRequest: (wordToGuess) => axiosClient.get("/word" + `?guess=${wordToGuess}`),
}

export default wordleApi