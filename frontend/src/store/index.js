import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./reducers/main"
import userReducer from "./reducers/user"

export default configureStore({
    reducer: {
        main: mainReducer,
        user: userReducer
    }
})