import { combineReducers } from 'redux'

const token = (state = '', action) => {
    console.log();
    
    switch (action.type) {
        case 'SET_TOKEN':
            localStorage.setItem('token', action.token)
            return action.token
        default:
            return state
    }
}

const userName = (state = '', action) => {
    switch (action.type) {
        case 'SET_USERNAME':
            localStorage.setItem('userName', action.userName)
            return action.userName
        default:
            return state
    }
}

export default combineReducers({
    token,
    userName
})