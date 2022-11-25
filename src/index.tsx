import * as React from "react";
import { createRoot } from 'react-dom/client';
import App from "./components/App"
import 'normalize.css';
import './index.scss';
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";


const app = document.getElementById("app")
const root = createRoot(app!); // createRoot(container!) if you use TypeScript
root.render(<App />);

