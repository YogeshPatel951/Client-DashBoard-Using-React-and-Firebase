import { NOTIFY_USER } from './types';
import { CLEAR_NOTIFY_STATE } from './types';

export const notifyUser = (message, messageType)=>{
    return{
        type: NOTIFY_USER,
        message,
        messageType
    }
}

export const clearNotifyState = ()=>{
    return{
        type: CLEAR_NOTIFY_STATE
    }
}