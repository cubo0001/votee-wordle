import words from './data/words.json'

/**
 * Guessing against random API automatically.
 * Interval loop guessing until state game is win or failed.
 * 
 * @param {array} boardItems
 * @param {number} rows
 * @param {number} columns
 * @param {array} stateGame
 * @param {function} callApi
 * @returns {void}
 */

const guesser = {
    guess: ({boardItems, rows, columns, stateGame}, callApi) => {
        const state = {
            correct: [],
            absent: [],
            present: [],
            appearedWords: []
        }

        const getGuessedWords = () => {
            let randomIndex = Math.floor(Math.random() * (words.length-1))
            const wordToGuess = words[randomIndex % words.length]
            if (words.length === 2) return words[1]
            if (state.appearedWords.includes(wordToGuess)) return getGuessedWords()
            state.appearedWords.push(wordToGuess)
            return wordToGuess
        }

        const checkGameState = () => {
            for (let i = 0; i < rows; i++) {
                let guessWord = boardItems[i]
                for (let j = 0; j < columns; j++) {
                    if (!guessWord[j]) continue
                    let [curChar, curEval] = Object.entries(guessWord[j])[0]
                    if (curEval === 'correct') {
                        state.correct.push([curChar, j])
                    } else if (curEval === 'present') {
                        state.present.push(curChar)
                    } else if (curEval === 'absent') {
                        state.absent.push(curChar)
                    }
                }
            }
        }

        let flag = true
        let currentRowAuto = 0
        const gameLoop = setInterval(() => {
            if (flag) {
                if (['win', 'failed'].includes(stateGame[0])) {
                    console.log("end game !!!")
                    clearInterval(gameLoop)
                    window.alert(`You ${stateGame[0]}!!!`)
                } else {
                    console.log("Filter words !!!")
                    checkGameState()
                    words = words.filter(word => {
                        for (let x = 0; x < state.absent.length; x++) {
                            if (word.includes(state.absent[x].toLowerCase())) {
                                return false
                            }
                        }

                        for (let x = 0; x < state.present.length; x++) {
                            if (!word.includes(state.present[x].toLowerCase())) {
                                return false
                            }
                        }

                        for (let x = 0; x < state.correct.length; x++) {
                            if (word.charAt(state.correct[x][1]) !== state.correct[x][0].toLowerCase()) {
                                return false
                            }
                        } 
                        
                        return true
                    })
                    
                    if (words.length === 0) {
                        console.log("ran out of words !!!")
                        clearInterval(gameLoop)
                    }
                }
            } else {
                const wordToGuess = getGuessedWords()
                callApi(wordToGuess, true, currentRowAuto)
                currentRowAuto = currentRowAuto + 1
            }

            flag = !flag
        }, 2500)
    }
}

export default guesser