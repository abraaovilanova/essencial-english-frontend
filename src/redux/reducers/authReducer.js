import { authActionsType } from '../actions/authActions'

const isLoggedInLocalStprage =  localStorage.getItem("token") ? true: false
const initialState = {
    isLoggedIn: localStorage.getItem("token") ? true: false,
    user: isLoggedInLocalStprage?
     JSON.parse(localStorage.getItem("auth"))
     :{
        name: null,
        email:null,
        token:null,
        _id:null,
    }
}


const authReducer = (state = initialState, action) => {
    switch (action.type){
        case authActionsType.SIGNUP_SUCCESS:
        case authActionsType.LOGIN_SUCCESS:
            const { user, token } = action.payload.data
            localStorage.setItem("auth",JSON.stringify(user))
            localStorage.setItem("token",token)
            return {
                isLoggedIn: true,
                user: {
                    name: user.name,
                    email: user.email,
                    token: token,
                    _id: user._id
                }
            }
        case authActionsType.LOGOUT_SUCCESS:
        case authActionsType.LOGOUT_FAIL:
            localStorage.removeItem('token')
            localStorage.removeItem('auth')
            return {
                isLoggedIn: false,
                user: {
                    name: null,
                    email: null,
                    token: null,
                    _id: null
                }
            }
        case authActionsType.SIGNUP_FAIL:
            return state

        default:
            return state
    }
}


export default authReducer