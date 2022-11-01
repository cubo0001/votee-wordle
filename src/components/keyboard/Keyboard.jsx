import React, { useState, useRef } from "react";
import wordleApi from "../../api/wordleApi";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";
import chunk from "../../utilties/chunk"
import guesser from "../../guesser"

const KeyboardComponent = ({ rows, columns, boardItems, setBoardItems, stateGame, setStateGame }) => {
  const [input, setInput] = useState('')
  const [currentRow, setCurrentRow] = useState(0)
  const [wordToGuess, setWordToGuess] = useState('')
  const [allowTyping, setAllowTyping] = useState(true)
  const keyboard = useRef()
  // Returns a random integer from 1 to 5000:
  const seed = Math.floor(Math.random() * 5000) + 1

  const callApi = (wordToGuess, autoGuess = false, currentRowAuto = 0) => {
    let currentRowExecute = currentRow
    console.log('Guessing against random API automatically with seed: ' + seed)
    return wordleApi.randomGetRequest(wordToGuess, seed).then(result => {
      if (result) {
        if (autoGuess) currentRowExecute = currentRowAuto
        const newBoardItem = (boardItems[currentRowExecute]).map((item, index) => {
          const { slot, guess } = result[index]
          if (slot === index && autoGuess) {
            return { [guess.toUpperCase()]: result[index]?.result }
          }
          if (slot === index && guess.toUpperCase() === Object.keys(item)[0]) {
            return { [guess.toUpperCase()]: result[index]?.result }
          }
        })
        boardItems[currentRowExecute] = newBoardItem
        setBoardItems([...boardItems])
        setWordToGuess('')
        setCurrentRow(currentRowExecute + 1)

        const winItem = [...Array(columns).keys()].map(column => 'correct')
        const newBoardStatusItem = newBoardItem.map(item => Object.values(item)[0])
        const isNewBoardItemEqualWinItem = (winItem.length === newBoardStatusItem.length) && winItem.every((value, index) => value === newBoardStatusItem[index])
        if (!isNewBoardItemEqualWinItem && ((currentRowExecute + 1) === rows)) {
          stateGame[0] = 'failed'
          setAllowTyping(false)
          return 'failed'
        }
        if (isNewBoardItemEqualWinItem) {
          stateGame[0] = 'win'
          setAllowTyping(false)
          return 'win'
        }
        setStateGame([...stateGame])
      }
    })
  }

  const onKeyPress = async inputKey => {
    if (inputKey === '{enter}') {
      if (wordToGuess) callApi(wordToGuess).then(result => {
        if (['win', 'failed'].includes(result)) window.alert(`You ${result}!!!`)
      })
    } else if (inputKey === 'AutoGuess') {
      guesser.guess({ boardItems, rows, columns, stateGame }, callApi)
    } else {
      const newInput = input + inputKey
      const chunkArr = chunk(newInput, 5)
      let newBoardItems = !wordToGuess && ([...boardItems]).reduce((initItem, currentItem, index) => {
        if (currentRow === index && chunkArr[index]) {
          const newArr = [...Array(5)].map((item, indexArr) => {
            const itemArr = [...chunkArr[index]][indexArr] ? { [[...chunkArr[index]][indexArr]]: 'waiting' } : item
            return itemArr
          })
          return [...initItem, newArr]
        }
        return [...initItem, currentItem]
      }, [])

      if (chunkArr[chunkArr.length - 1].length === 5) setWordToGuess(chunkArr[chunkArr.length - 1])
      allowTyping && newBoardItems && setBoardItems([...newBoardItems])
      allowTyping && !wordToGuess && setInput(newInput)
    }
  };

  return (
    <div className="keyboard-container">
      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        syncInstanceInputs={true}
        layoutName='default'
        layout={{
          default: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L {enter}",
            "Z X C V B N M {bksp}",
            "AutoGuess"
          ]
        }}
        maxLength={rows * columns}
        onKeyPress={(button) => onKeyPress(button)}
      />
    </div>
  );
}

export default KeyboardComponent

