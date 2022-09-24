import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import {TasksProvider} from "./contexts/TasksContext";
import {TimeProvider} from "./contexts/TimeContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ChakraProvider>
        <TasksProvider>
            <TimeProvider>
                <App/>
            </TimeProvider>
        </TasksProvider>
    </ChakraProvider>
);
