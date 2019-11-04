/**
 * 
 * mail_reducer : which containe all reducers related to mail
 *  
 */
export default function(state={},action){
    switch(action.type){
        case 'SEND_MAIL':
            return { ...state,mail:action.payload }
        default:
            return state;
    }
}