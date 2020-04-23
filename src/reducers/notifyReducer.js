import { NOTIFY_USER } from '../actions/types';
import { CLEAR_NOTIFY_STATE } from '../actions/types';

const initialState ={
    message:null,
    messageType:null
}

export default function (state=initialState, action){
    switch(action.type){
        case NOTIFY_USER: {
            return{
                ...state,
                message: action.message,
                messageType: action.messageType
            }
        }
        case CLEAR_NOTIFY_STATE: {
            console.log('Clearninggg')
            return{
                ...state,
                message: null,
                messageType: null
            }
        }

        default:
            return state
    }
}