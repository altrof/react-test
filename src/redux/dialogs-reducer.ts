const SEND_NEW_MESSAGE= 'SEND-NEW-MESSAGE'

type DialogType = {
    id: number
    name: string
    isMale: boolean
}

type MessageType = {
    id: number
    message: string
    isMyMessage: boolean
}

let initialState = {
    dialogs: [
        { id: 1, name: 'Aleksandr', isMale: true },
        { id: 2, name: 'Alisa', isMale: false },
        { id: 3, name: 'Artem', isMale: true },
        { id: 4, name: 'Alina', isMale: false },
        { id: 5, name: 'Jekaterina', isMale: false },
        { id: 6, name: 'Anastassia', isMale: false }
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'Hi!' },
        { id: 2, message: 'Hello!', isMyMessage: true },
        { id: 3, message: 'How are you?' },
        { id: 4, message: 'Nice', isMyMessage: true },
        { id: 5, message: 'Nice to meet you!' },
        { id: 6, message: 'I too!', isMyMessage: true }
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SEND_NEW_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id:6 , message: body, isMyMessage: true}]
            }
        default:
            return state;
    }
    
}

type SendNewMessageActionType = {
    type: typeof SEND_NEW_MESSAGE
    newMessageBody: string
}

export const sendNewMessage = (newMessageBody: string):SendNewMessageActionType => ({type: SEND_NEW_MESSAGE, newMessageBody})



export default dialogsReducer;