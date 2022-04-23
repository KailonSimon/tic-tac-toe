import { configureStore } from '@reduxjs/toolkit'
import gameboardReducer from './gameboardSlice'


export const store = configureStore({
    reducer: {
        gameboard: gameboardReducer,
    }
})