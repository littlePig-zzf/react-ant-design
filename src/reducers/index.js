import { combineReducers } from 'redux'

const token = (state = '', action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return action.token
        default:
            return state
    }
}

const userName = (state = '', action) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return action.userName
    
        default:
            return state
    }
}


export default combineReducers({
    token,
    userName
})