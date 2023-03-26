import './App.scss'

function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  )
}

function Calculator() {

  interface Operation {
    firstNumber: number,
    secondNumber: number,
    signal: string
  }

  function workCalculator() {
    const str = /\d+[-+*/]\d+/
    let current = getDisplayText()
    while (thereIsCalculation(current)) {
      const operation = getOperationFromString(getCurrentOperationString(current))
      const result = getOperationResult(operation)
      current = current.replace(str, result)
    }

    setDisplayText(current)
  }

  function thereIsCalculation(expression: string): boolean {
    const str = /\d+[-+*/]\d+/
    return str.test(expression)
  }
  //Needs revision
  function getCurrentOperationString(expression: string) {
    const str = /\d+[-+*/]\d+/
    const currentOperation = expression.match(str)
    return currentOperation !== null ? currentOperation[0] : "0+0"
  }

  function getOperationPartsFromString(operationString: string): { half1: string, half2: string, signal: string } {
    let operationParts = { half1: '', half2: '', signal: '' }
    for (let char of operationString) {
      if (operationParts.signal == '') {
        if (char == '+' || char == '-' || char == '*' || char == '/') operationParts.signal = char
        else operationParts.half1 += char
      }
      else operationParts.half2 += char
    }
    return operationParts
  }

  function getOperationFromString(operationString: string): Operation {
    const expressionTextParts = getOperationPartsFromString(operationString)
    const operation: Operation = {
      firstNumber: parseFloat(expressionTextParts.half1),
      secondNumber: parseFloat(expressionTextParts.half2),
      signal: expressionTextParts.signal
    }

    return operation
  }

  function getOperationResult(operation: Operation): any {
    let result
    switch (operation.signal) {
      case '+':
        result = operation.firstNumber + operation.secondNumber
        break
      case '-':
        result = operation.firstNumber - operation.secondNumber
        break
      case '*':
        result = operation.firstNumber * operation.secondNumber
        break
      case '/':
        result = operation.firstNumber / operation.secondNumber
        break
      default:
        result = NaN
        console.error("Something went wrong with 'getOperationResult'")
    }

    return result
  }

  function getDisplayText(): string {
    const display = (document.querySelector('.calculator-display p') as HTMLParagraphElement)
    return display.innerText
  }

  function insertOnDisplay(char: string) {
    let display = (document.querySelector('.calculator-display p') as HTMLParagraphElement)
    display.innerText == "0" ? display.innerText = char : display.innerText += char
  }

  function setDisplayText(text: string) {
    const display = (document.querySelector('.calculator-display p') as HTMLParagraphElement)
    display.innerText = text
  }

  function clearDisplay() {
    setDisplayText('0')
  }

  return (
    <div className={'calculator'}>
      <div className={'display-row'}>
        <div className={'calculator-display'}>
          <p>0</p>
        </div>
      </div>
      <div className={'calculator-keyboard'}>
        <div className={'keyboard-row'}>
          <Key onclick={insertOnDisplay} symbol={'7'} />
          <Key onclick={insertOnDisplay} symbol={'8'} />
          <Key onclick={insertOnDisplay} symbol={'9'} />
          <Key onclick={clearDisplay} symbol={'C'} />
          <Key onclick={workCalculator} symbol={'='} />
        </div>
        <div className={'keyboard-row'}>
          <Key onclick={insertOnDisplay} symbol={'4'} />
          <Key onclick={insertOnDisplay} symbol={'5'} />
          <Key onclick={insertOnDisplay} symbol={'6'} />
          <Key onclick={insertOnDisplay} symbol={'+'} />
          <Key onclick={insertOnDisplay} symbol={'-'} />
        </div>
        <div className={'keyboard-row'}>
          <Key onclick={insertOnDisplay} symbol={'1'} />
          <Key onclick={insertOnDisplay} symbol={'2'} />
          <Key onclick={insertOnDisplay} symbol={'3'} />
          <Key onclick={insertOnDisplay} symbol={'*'} />
          <Key onclick={insertOnDisplay} symbol={'/'} />
        </div>
        <div className={'keyboard-row'}>
          <Key onclick={insertOnDisplay} symbol={'0'} />
        </div>
      </div>
    </div>
  )
}

function Key(props: { symbol: string, onclick: Function }) {
  return (
    <div className={'keyboard-key'} onClick={(e) => props.onclick(props.symbol)}>
      <p>{props.symbol}</p>
    </div>
  )
}

export default App
