import { AUTH,LOGOUT,AUTH_ERROR,ERROR } from '../constants/actionTypes'

const authReducers = (state={authData:null,errorMessage:''}, action) => {
    switch (action.type)
    {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return {...state,authData:action?.data}
            
        case LOGOUT:
            localStorage.clear()
            return { ...state, authData: null }
        case AUTH_ERROR:
            return {...state,errorMessage:action?.data?.response?.data?.message}
        case ERROR:
            return {...state,errorMessage:''}
        
        default:
            return state
    }
}
export default authReducers