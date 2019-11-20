
//@flow
export const TOGGLE_VK_CLIENT_SUCCESS = 'TOGGLE_VK_CLIENT_SUCCESS'
export const TOGGLE_VK_CLIENT_REQUEST = 'TOGGLE_VK_CLIENT_REQUEST'
export const TOGGLE_VK_CLIENT_FAILED = 'TOGGLE_VK_CLIENT_FAILED'
import { API } from "../API";
const toggleVkThemeRequest = ()=>{
    type: TOGGLE_VK_CLIENT_REQUEST,
    payload: {
        error: false,
        isFetching: true
    }
}

const toggleVkThemeSuccess = (res)=>{
    type: TOGGLE_VK_CLIENT_SUCCESS,
    payload: res
}

const toggleVkThemeFailure = (message)=>{
    type: TOGGLE_VK_CLIENT_FAILED,
    payload: 
    error: true,
    payload:{
        message: message
    }
}

export const toggleVkClientTheme = (is_vk_theme: boolea)=>{
    return (dispatch:Function)=>{

        dispatch(toggleVkThemeRequest())
        fetch(API.TOGGLE_VK_CLIENT_THEME,{
            body: JSON.stringify({
                is_vk_theme
              })
        }).then(res=>res.json()).then(res=>dispatch(toggleVK)).catch(err=>dispatch(toggleVkThemeFailure(err)))
    }
}