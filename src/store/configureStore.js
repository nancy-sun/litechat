import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../reducers/user";
import avatarReducer from "../reducers/userColor";
import roomReducer from "../reducers/room";

const store = configureStore({
    reducer: {
        user: userReducer,
        avatar: avatarReducer,
        room: roomReducer
    }
})

export default store;