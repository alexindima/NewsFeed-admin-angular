import * as React from "react";
import {createRoot} from 'react-dom/client';
import App from "./app/components/App"
import '../node_modules/normalize.css/normalize.css';
import './index.scss';

const app = document.getElementById("app")
const root = createRoot(app!); // createRoot(container!) if you use TypeScript
root.render(<App/>);

