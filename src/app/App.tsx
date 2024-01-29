import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {StatusType} from "./app-reducer";


function App() {
    const status = useSelector<AppRootStateType, StatusType>(state=> state.app.status)
    const dispatch = useDispatch()
    return (
        <div className = "App">
            <ErrorSnackbar/>
            <AppBar position = "static">
                <Toolbar>
                    <IconButton
                        edge = "start"
                        color = "inherit"
                        aria-label = "menu">
                        <Menu />
                    </IconButton>
                    <Typography variant = "h6">
                        News
                    </Typography>
                    <Button color = "inherit">Login</Button>
                </Toolbar>
                {status=== 'loading' &&<LinearProgress />}
            </AppBar>
            <Container fixed>
                  <TodolistsList/>
            </Container>
        </div>

    );
};


   export default App
