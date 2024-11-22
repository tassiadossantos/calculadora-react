# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



--------------------------------------------------------------------------
Passo 1: Configuração do Projeto
Primeiro, vamos criar um novo projeto React usando o Create React App.
Abra seu terminal e execute:
text
npx create-react-app calculadora-react
cd calculadora-react

Agora, vamos limpar alguns arquivos desnecessários. Exclua os seguintes arquivos:
src/App.css
src/App.test.js
src/logo.svg
src/reportWebVitals.js
src/setupTests.js
Modifique o arquivo src/index.js para ficar assim:
jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

Passo 2: Criação dos Componentes
Vamos criar três componentes principais: Calculator, Display e Button.
Crie uma pasta components dentro da pasta src.
Dentro da pasta components, crie três arquivos: Calculator.js, Display.js e Button.js.
No arquivo src/components/Calculator.js:
jsx
import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState(null);
  const [prevValue, setPrevValue] = useState(null);

  const handleNumber = (number) => {
    setDisplay(display === '0' ? number : display + number);
  };

  const handleOperation = (op) => {
    if (op === 'C') {
      setDisplay('0');
      setOperation(null);
      setPrevValue(null);
    } else if (op === '=') {
      if (operation && prevValue) {
        const current = parseFloat(display);
        let result;
        switch (operation) {
          case '+':
            result = prevValue + current;
            break;
          case '-':
            result = prevValue - current;
            break;
          case '*':
            result = prevValue * current;
            break;
          case '/':
            result = prevValue / current;
            break;
          default:
            return;
        }
        setDisplay(result.toString());
        setOperation(null);
        setPrevValue(null);
      }
    } else {
      setOperation(op);
      setPrevValue(parseFloat(display));
      setDisplay('0');
    }
  };

  return (
    <div className="calculator">
      <Display value={display} />
      <div className="buttons">
        <Button onClick={() => handleNumber('7')}>7</Button>
        <Button onClick={() => handleNumber('8')}>8</Button>
        <Button onClick={() => handleNumber('9')}>9</Button>
        <Button onClick={() => handleOperation('/')}>/</Button>
        
        <Button onClick={() => handleNumber('4')}>4</Button>
        <Button onClick={() => handleNumber('5')}>5</Button>
        <Button onClick={() => handleNumber('6')}>6</Button>
        <Button onClick={() => handleOperation('*')}>*</Button>
        
        <Button onClick={() => handleNumber('1')}>1</Button>
        <Button onClick={() => handleNumber('2')}>2</Button>
        <Button onClick={() => handleNumber('3')}>3</Button>
        <Button onClick={() => handleOperation('-')}>-</Button>
        
        <Button onClick={() => handleNumber('0')}>0</Button>
        <Button onClick={() => handleOperation('C')}>C</Button>
        <Button onClick={() => handleOperation('=')}>=</Button>
        <Button onClick={() => handleOperation('+')}>+</Button>
      </div>
    </div>
  );
};

export default Calculator;

No arquivo src/components/Display.js:
jsx
import React from 'react';

const Display = ({ value }) => {
  return <div className="display">{value}</div>;
};

export default Display;

No arquivo src/components/Button.js:
jsx
import React from 'react';

const Button = ({ onClick, children }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

Passo 3: Modificação do App.js
Modifique o arquivo src/App.js para incluir o componente Calculator:
jsx
import React from 'react';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;

Passo 4: Estilização
Vamos adicionar alguns estilos básicos. Modifique o arquivo src/index.css:
css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

.calculator {
  background-color: #333;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.display {
  background-color: #fff;
  padding: 10px;
  font-size: 24px;
  text-align: right;
  margin-bottom: 10px;
  border-radius: 5px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.button {
  padding: 15px;
  font-size: 18px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #45a049;
}

Passo 5: Execução do Projeto
Agora que temos todos os componentes e estilos configurados, podemos executar nosso projeto:
text
npm start

Isso iniciará o servidor de desenvolvimento e abrirá a calculadora no seu navegador padrão.
Esta é uma implementação básica de uma calculadora usando React. Ela suporta as operações de adição, subtração, multiplicação e divisão, além de ter um botão para limpar o display. Você pode expandir este projeto adicionando mais funcionalidades, como operações com números decimais, percentagem, ou até mesmo funções trigonométricas.
Amplie as funcoes na calcularoea de modo a ter todas as funcçoes de uma calculadora com trigonometria e cietifica


Resposta
Claro! Vamos expandir nossa calculadora para incluir funções trigonométricas e científicas. Vou modificar o componente Calculator e adicionar novos botões para estas funções.
Primeiro, vamos atualizar o arquivo src/components/Calculator.js:
jsx
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

Agora, vamos atualizar o CSS para acomodar os novos botões. Modifique o arquivo src/index.css:
css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

.calculator {
  background-color: #333;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  width: 320px;
}

.display {
  background-color: #fff;
  padding: 10px;
  font-size: 24px;
  text-align: right;
  margin-bottom: 10px;
  border-radius: 5px;
  min-height: 36px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.button {
  padding: 15px 5px;
  font-size: 14px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #45a049;
}

.button:nth-child(4n) {
  background-color: #ff9800;
}

.button:nth-child(4n):hover {
  background-color: #e68a00;
}

Esta versão expandida da calculadora agora inclui as seguintes funções científicas e trigonométricas:
Seno (sin)
Cosseno (cos)
Tangente (tan)
Logaritmo base 10 (log)
Logaritmo natural (ln)
Raiz quadrada (√)
Quadrado (x²)
Potência (x^y)
Exponencial (e^x)
Potência de 10 (10^x)
Recíproco (1/x)
Valor absoluto (|x|)
Pi (π)
Número de Euler (e)
Além disso, mantivemos as operações básicas (adição, subtração, multiplicação e divisão) e adicionamos suporte para números decimais.
Para usar esta calculadora:
Para operações básicas, clique nos números e operadores como em uma calculadora normal.
Para funções de um único argumento (como sin, cos, log, etc.), insira o número primeiro e depois clique na função.
Para a função de potência (x^y), insira a base, clique em x^y, e depois insira o expoente.
Use o botão C para limpar a calculadora e começar um novo cálculo.
Esta implementação fornece uma base sólida para uma calculadora científica em React. # calculadora-react
