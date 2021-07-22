
const SEND_NEW_MESSAGE = 'SEND-NEW-MESSAGE'

let initialState = {
    dialogs: [
        { id: 1, name: 'Aleksandr', isMale: true },
        { id: 2, name: 'Alisa', isMale: false },
        { id: 3, name: 'Artem', isMale: true },
        { id: 4, name: 'Alina', isMale: false },
        { id: 5, name: 'Jekaterina', isMale: false },
        { id: 6, name: 'Anastassia', isMale: false }
    ],
    messages: [
        { id: 1, message: 'Hi!' },
        { id: 2, message: 'qq!', isMyMessage: true },
        { id: 3, message: 'How are you?' },
        { id: 4, message: 'Poshel nah', isMyMessage: true },
        { id: 5, message: 'Nice to meet you!' },
        { id: 6, message: 'I too!', isMyMessage: true }
    ]
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_NEW_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id:6 , message: body, isMyMessage: true}]
            }
        default:
            return state;
    }
    
}

export const sendNewMessage = (newMessageBody) => ({type: SEND_NEW_MESSAGE, newMessageBody})



export default dialogsReducer;