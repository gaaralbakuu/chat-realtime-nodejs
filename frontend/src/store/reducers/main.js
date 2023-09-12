import { createSlice } from '@reduxjs/toolkit'

const mainSlice = createSlice({
    name: 'main',
    initialState: {
        rooms: [],
        users: [],
        state: {
            username: "",
            isJoining: false,
            isJoined: false,
        }
    },
    reducers: {
        setRooms: (state, action) => {
            state.rooms = action.payload
        },
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setStateUsername: (state, action) => {
            state.state.username = action.payload
        },
        setStateJoining: (state, action) => {
            state.state.isJoining = action.payload
        },
        setStateJoined: (state, action) => {
            state.state.isJoined = action.payload
        }
    }
})

export const { setRooms, setUsers, setStateUsername, setStateJoining, setStateJoined, setSocket } = mainSlice.actions
export default mainSlice.reducer