
import { AUTH,AUTH_ERROR,ERROR } from '../constants/actionTypes'


import * as api from '../api/index.js'


export const signin = (formData,history) => async (dispatch) => {
    try
    {
        const { data } = await api.signIn(formData)
        
        dispatch({ type: AUTH, data })
        history.push('/')
    
    
    }
    catch (error)
    {
        const data=error
        dispatch({ type: AUTH_ERROR,data})
        history.push('/auth')
    }


    
}


export const signup = (formData,history) => async (dispatch) => {
    try
    {
        
        const { data } = await api.signUp(formData)
        
        dispatch({type:AUTH,data})
        //signup the user
        history.push('/')
        
    }
    catch (error)
    {
        const data=error
        dispatch({ type: AUTH_ERROR,data})
        history.push('/auth')
    }


    
}

export const handleError = () => async (dispatch) => {
    try
    {
        
        
        dispatch({ type: ERROR })
    
    
    }
    catch (error)
    {
        console.log(error)
    }


    
}