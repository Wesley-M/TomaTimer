import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {Box, Flex} from "@chakra-ui/react";
import PomodoroTimer from "./components/PomodoroTimer";
import TaskOrganizer from "./components/TaskOrganizer";
import Footer from "./components/Footer";
import TimeContext from "./contexts/TimeContext";

function App() {
    return (
        <Flex flexDirection="column" minHeight="100vh" className="App">
            <Navbar/>
            <Flex
                flexGrow={1}
                flexDirection={{base: 'column', md: 'row'}}
                color='white'
                mb='15vh'
            >
                <Box flex={['1', '2', '2', '1']}>
                    <PomodoroTimer/>
                </Box>
                <Box flex={['1', '2', '3', '2']}>
                    <TaskOrganizer/>
                </Box>
            </Flex>
            <Footer/>
        </Flex>
    );
}

export default App;
