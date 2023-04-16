interface Operation {
    firstNumber: number,
    secondNumber: number,
    signal: string
}

const controller = {
    regexp: /\d+[-+*/]\d+/,

    workCalculator(displayText: string, setDisplayText: Function) {
        let current = displayText
        while (this.thereIsCalculation(current)) {
            const operation = this.getOperationFromString(this.getCurrentOperationString(current))
            const result = this.getOperationResult(operation)
            current = current.replace(this.regexp, result)
        }

        setDisplayText(current)
    },

    thereIsCalculation(expression: string): boolean {
        return this.regexp.test(expression)
    },

    getCurrentOperationString(expression: string) {
        const currentOperation = expression.match(this.regexp)
        return currentOperation !== null ? currentOperation[0] : "0+0"
    },

    getOperationPartsFromString(operationString: string): { half1: string, half2: string, signal: string } {
        let operationParts = { half1: '', half2: '', signal: '' }
        for (let char of operationString) {
            if (operationParts.signal == '') {
                if (char == '+' || char == '-' || char == '*' || char == '/') operationParts.signal = char
                else operationParts.half1 += char
            }
            else operationParts.half2 += char
        }
        return operationParts
    },

    getOperationFromString(operationString: string): Operation {
        const expressionTextParts = this.getOperationPartsFromString(operationString)
        const operation: Operation = {
            firstNumber: parseFloat(expressionTextParts.half1),
            secondNumber: parseFloat(expressionTextParts.half2),
            signal: expressionTextParts.signal
        }

        return operation
    },

    getOperationResult(operation: Operation): any {
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
}

export default controller