import React, { useState } from "react";
import {Container} from "react-bootstrap";
import KeyboardComponent from '../components/keyboard/Keyboard'
import BoardComponent from '../components/board/Board'
import Header from "../components/header/Header";
const ROWS = parseInt(process.env.REACT_APP_WORDLE_ROWS)
const COLUMNS = parseInt(process.env.REACT_APP_WORDLE_COLUMNS)

const Wordle = () => {
    const initBoardItem = [...Array(ROWS).keys()].map(row => [...Array(COLUMNS)])
    const initStateGame = ['playing']
    const [boardItems, setBoardItems] = useState(initBoardItem)
    const [stateGame, setStateGame] = useState(initStateGame)

    return (
        <>
           <Header/>
            <div className="starter-template">
                <Container>
                    <BoardComponent rows={ROWS} columns={COLUMNS} content={boardItems}/>
                    <KeyboardComponent rows={ROWS} columns={COLUMNS} boardItems={boardItems} stateGame={stateGame} setStateGame={setStateGame} setBoardItems={setBoardItems}/>
                </Container>
            </div>
        </>
    );
};

export default Wordle;
