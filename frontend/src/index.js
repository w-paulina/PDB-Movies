import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '10px',
  transition: transitions.SCALE,
    
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
)

render(<Root />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
