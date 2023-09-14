import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        incremented: state => {
            state.value += 1
        },
        decremented: state => {
            state.value -= 1
        }
    }
})

export const { incremented, decremented } = counterSlice.actions

export const userCredentialSlice = createSlice({
    name: 'userCredential',
    initialState: {
        username: '',
        userId: '',
        jwtToken: '',
        avatarUrl: ''
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        setJwtToken: (state, action) => {
            state.jwtToken = action.payload
        },
        setAvatarUrl: (state, action) => {
            state.avatarUrl = action.payload
        }
    }
})

export const loginModalSlice = createSlice({
    name: 'loginModal',
    initialState: {
        showLoginModal: false
    },
    reducers: {
        setShowLoginModal: (state, action) => {
            state.showLoginModal = action.payload
        }
    }
})

export const { setUsername, setUserId, setJwtToken, setAvatarUrl } = userCredentialSlice.actions

export const { setShowLoginModal } = loginModalSlice.actions

export const selectUserCredential = (state) => state.userCredential