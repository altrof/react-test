import dialogsReducer from "./dialogs-reducer"
import profileReducer from "./profile-reducer"
import sidebarReducer from "./sidebar-reducer"

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hello JavaScript!', likesCount: 36 },
                { id: 2, message: 'I am read to hacking!', likesCount: 73 },
                { id: 3, message: 'Lets start', likesCount: 94 }
            ],
            newPostText: 'altrof.eu'
        },
        dialogsPage: {
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
            ],
            newMessageBody: ""
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer; // Pattern 
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state)

    }


}

export default store;
window.store = store;

