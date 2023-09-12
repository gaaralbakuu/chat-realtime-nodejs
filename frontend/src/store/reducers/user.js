import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        name: null,
        room: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.room = action.payload.room
        }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer