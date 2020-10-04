import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './styles/index.css';
import './styles/nav-bar/nav-bar.css';

import './styles/overview/overview.css';
import './styles/overview/overview-header.css';
import './styles/overview/overview-body.css';

import "./styles/management/management.css"
import "./styles/management/management-header.css"
import "./styles/management/management-body.css"

import "./styles/display/display.css"

import "./styles/transitions/slide.css"
import 'semantic-ui-css/semantic.min.css'
import "react-datepicker/dist/react-datepicker.css"
import "simplebar/src/simplebar.css"

import { Provider } from "react-alert";
import AlertTemplate from 'react-alert-template-basic'

ReactDOM.render(
    <Provider template={AlertTemplate} {...{timeout: 5000}}>
    <App />
    </Provider>,
  document.getElementById('root')
);