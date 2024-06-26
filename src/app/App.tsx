import React, { useCallback, useEffect } from 'react'
import './App.css'
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from '@mui/material'
import { Menu } from '@mui/icons-material'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import { ErrorSnackbar } from '../components/ErrorSnackBar/ErrorSnackBar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppRootStateType } from './store'
import { initializeAppTC, StatusType } from './app-reducer'
import { BrowserRouter, Navigate, Route, RouterProvider, Routes } from 'react-router-dom'
import { Login } from '../features/Login/Login'
import { logoutTC } from '../features/Login/auth-reducer'

type PropsType = {
  demo?: boolean
}

function App({ demo = false }: PropsType) {
  const status = useSelector<AppRootStateType, StatusType>((state) => state.app.status)
  const isInitialised = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialised)
  const isLoggedIn = useSelector<AppRootStateType>((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!demo) {
      dispatch(initializeAppTC())
    }
  }, [])

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC())
  }, [])

  if (!isInitialised) {
    return (
      <div style={{ position: 'fixed', top: '30%', left: '50%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">News</Typography>
            {isLoggedIn ? (
              <Button color="inherit" onClick={logoutHandler}>
                Log Out
              </Button>
            ) : (
              ''
            )}
          </Toolbar>
          {status === 'loading' && <LinearProgress />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={'/'} element={<TodolistsList demo={demo} />} />
            <Route path={'/login'} element={<Login />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App
