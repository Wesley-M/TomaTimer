import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {TasksProvider} from "./contexts/TasksContext";
import {TimeProvider} from "./contexts/TimeContext";
import {ThemeContextProvider} from "./themes/ThemeContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ThemeContextProvider>
        <TasksProvider>
            <TimeProvider>
                <App/>
            </TimeProvider>
        </TasksProvider>
    </ThemeContextProvider>
);
