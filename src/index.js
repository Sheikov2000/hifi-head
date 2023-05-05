import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { HiFi } from "./components/HiFi"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <HiFi />
    </BrowserRouter>
)

