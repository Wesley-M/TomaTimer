import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {Box, Flex} from "@chakra-ui/react";
import PomodoroTimer from "./components/PomodoroTimer";
import TaskOrganizer from "./components/TaskOrganizer";
import Footer from "./components/Footer";

function App() {
    return (
        <Flex bg="primary.main" transition="all 500ms ease" flexDirection="column" minHeight="100vh" className="App">
            <Navbar/>
            <Flex
                flexGrow={1}
                flexDirection={{base: 'column', md: 'row'}}
                color='white'
                mb='15vh'
            >
                <Box w="fit-content">
                    <PomodoroTimer/>
                </Box>
                <Box w="fit-content">
                    <TaskOrganizer/>
                </Box>
            </Flex>
            <Footer/>
        </Flex>
    );
}

export default App;
