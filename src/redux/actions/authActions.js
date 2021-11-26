import axios from 'axios'
import { url } from '../../api/api'

const authActionsType = {
    SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
    SIGNUP_FAIL: 'SIGNUP_FAIL',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAIL: 'LOGOUT_FAIL',
    LOGIN_SUCCESS:'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL'
}

const SignUpAuthAction = (userState, history) => {
    return async (dispatch) => {
        try{
            const {name, email, password } = userState
            const data = await axios
            .post(`${url}/auth/register`,{name, email, password })
            console.log(data)
            dispatch({type:authActionsType.SIGNUP_SUCCESS, payload: data})
            history("/")
        }catch (err){
            console.log(err)
            dispatch({type:authActionsType.SIGNUP_FAIL, payload: ''})
        }

    }
}

const LogOutAuthAction = (history) => {
    return async (dispatch) => {
        try{
            dispatch({type:authActionsType.LOGOUT_SUCCESS, payload: {}})
            history("/")
        }catch (err){
            console.log(err)
            dispatch({type:authActionsType.LOGOUT_FAIL, payload: ''})
        }

    }
}

const LoginAuthAction = (loginState, history) => {
    return async (dispatch) => {
        try{
            const res = await axios.post(`${url}/auth/authenticate`,loginState)
            const { user, token } = res.data
            dispatch({type: authActionsType.LOGIN_SUCCESS, payload: {data: {user, token}}})
            history("/")
        }catch(err){
            dispatch({type: authActionsType.LOGIN_FAIL, payload: {}})
            console.log(err)
        }
    }

}

export { 
    authActionsType,
    SignUpAuthAction,
    LogOutAuthAction,
    LoginAuthAction
    }