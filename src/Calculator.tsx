import KeyboardButton from "./KeyboardButton"
import Display from "./Display"
import { useState } from "react"
import controller from "./controller"

export default function Calculator() {

    const [display, setDisplay] = useState("0")
    const keyboardRows = {
        row1: [
            <KeyboardButton onclick={insertOnDisplay} symbol={'7'} />,
            <KeyboardButton onclick={insertOnDisplay} symbol={'8'} />,
            <KeyboardButton onclick={insertOnDisplay} symbol={'9'} />,
            <KeyboardButton onclick={clearDisplay} symbol={'C'} />,
            <KeyboardButton onclick={() => controller.workCalculator(display, handleSetdisplay)} symbol={'='} />
        ],
        row2: [
            <KeyboardButton onclick={insertOnDisplay} symbol={'4'} />,
            <KeyboardButton onclick={insertOnDisplay} symbol={'5'} />,
            <KeyboardButton onclick={insertOnDisplay} symbol={'6'} />,
            <KeyboardButton onclick={insertOnDisplay} symbol={'+'} />,
            <KeyboardButton onclick={insertOnDisplay} symbol={'-'} />
        ],
        row3: [
            <KeyboardButton onclick={insertOnDisplay} symbol={'1'} />,
            <KeyboardButton onclick={insertOnDisplay} symbol={'2'} />,
            <KeyboardButton onclick={insertOnDisplay} symbol={'3'} />,
            <KeyboardButton onclick={insertOnDisplay} symbol={'*'} />,
            <KeyboardButton onclick={insertOnDisplay} symbol={'/'} />
        ],
        row4: [
            <KeyboardButton onclick={insertOnDisplay} symbol={'0'} />
        ]
    }

    function handleSetdisplay(text: string) {
        setDisplay(text)
    }

    function insertOnDisplay(char: string) {
        display == "0" ? handleSetdisplay(char) : handleSetdisplay(display + char)
    }

    function clearDisplay() {
        handleSetdisplay('0')
    }

    return (
        <div className={'calculator'}>
            <Display text={display} />
            <div className={'calculator-keyboard'}>
                <div className={'keyboard-row'}>
                    {keyboardRows.row1}
                </div>
                <div className={'keyboard-row'}>
                    {keyboardRows.row2}
                </div>
                <div className={'keyboard-row'}>
                    {keyboardRows.row3}
                </div>
                <div className={'keyboard-row'}>
                    {keyboardRows.row4}
                </div>
            </div>
        </div>
    )
}