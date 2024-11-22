import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState(null);
  const [prevValue, setPrevValue] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumber = (number) => {
    if (waitingForOperand) {
      setDisplay(number);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? number : display + number);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op) => {
    const current = parseFloat(display);

    if (op === 'C') {
      setDisplay('0');
      setOperation(null);
      setPrevValue(null);
      setWaitingForOperand(false);
    } else if (op === '=') {
      if (operation && prevValue !== null) {
        const result = calculate(prevValue, current, operation);
        setDisplay(result.toString());
        setOperation(null);
        setPrevValue(null);
        setWaitingForOperand(true);
      }
    } else if (['+', '-', '*', '/'].includes(op)) {
      if (operation && prevValue !== null && !waitingForOperand) {
        const result = calculate(prevValue, current, operation);
        setDisplay(result.toString());
        setPrevValue(result);
      } else {
        setPrevValue(current);
      }
      setOperation(op);
      setWaitingForOperand(true);
    } else {
      // Funções científicas
      let result;
      switch (op) {
        case 'sin':
          result = Math.sin(current);
          break;
        case 'cos':
          result = Math.cos(current);
          break;
        case 'tan':
          result = Math.tan(current);
          break;
        case 'log':
          result = Math.log10(current);
          break;
        case 'ln':
          result = Math.log(current);
          break;
        case 'sqrt':
          result = Math.sqrt(current);
          break;
        case 'x^2':
          result = Math.pow(current, 2);
          break;
        case 'x^y':
          setOperation('pow');
          setPrevValue(current);
          setWaitingForOperand(true);
          return;
        case 'e^x':
          result = Math.exp(current);
          break;
        case '10^x':
          result = Math.pow(10, current);
          break;
        case '1/x':
          result = 1 / current;
          break;
        case '|x|':
          result = Math.abs(current);
          break;
        case 'π':
          result = Math.PI;
          break;
        case 'e':
          result = Math.E;
          break;
        default:
          return;
      }
      setDisplay(result.toString());
      setWaitingForOperand(true);
    }
  };

  const calculate = (a, b, operation) => {
    switch (operation) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      case 'pow':
        return Math.pow(a, b);
      default:
        return b;
    }
  };

  return (
    <div className="calculator">
      <Display value={display} />
      <div className="buttons">
        <Button onClick={() => handleOperation('sin')}>sin</Button>
        <Button onClick={() => handleOperation('cos')}>cos</Button>
        <Button onClick={() => handleOperation('tan')}>tan</Button>
        <Button onClick={() => handleOperation('C')}>C</Button>

        <Button onClick={() => handleOperation('log')}>log</Button>
        <Button onClick={() => handleOperation('ln')}>ln</Button>
        <Button onClick={() => handleOperation('sqrt')}>√</Button>
        <Button onClick={() => handleOperation('/')}>/</Button>

        <Button onClick={() => handleNumber('7')}>7</Button>
        <Button onClick={() => handleNumber('8')}>8</Button>
        <Button onClick={() => handleNumber('9')}>9</Button>
        <Button onClick={() => handleOperation('*')}>*</Button>

        <Button onClick={() => handleNumber('4')}>4</Button>
        <Button onClick={() => handleNumber('5')}>5</Button>
        <Button onClick={() => handleNumber('6')}>6</Button>
        <Button onClick={() => handleOperation('-')}>-</Button>

        <Button onClick={() => handleNumber('1')}>1</Button>
        <Button onClick={() => handleNumber('2')}>2</Button>
        <Button onClick={() => handleNumber('3')}>3</Button>
        <Button onClick={() => handleOperation('+')}>+</Button>

        <Button onClick={() => handleOperation('x^2')}>x²</Button>
        <Button onClick={() => handleNumber('0')}>0</Button>
        <Button onClick={handleDecimal}>.</Button>
        <Button onClick={() => handleOperation('=')}>=</Button>

        <Button onClick={() => handleOperation('x^y')}>x^y</Button>
        <Button onClick={() => handleOperation('e^x')}>e^x</Button>
        <Button onClick={() => handleOperation('10^x')}>10^x</Button>
        <Button onClick={() => handleOperation('1/x')}>1/x</Button>

        <Button onClick={() => handleOperation('|x|')}>|x|</Button>
        <Button onClick={() => handleOperation('π')}>π</Button>
        <Button onClick={() => handleOperation('e')}>e</Button>
      </div>
    </div>
  );
};

export default Calculator;