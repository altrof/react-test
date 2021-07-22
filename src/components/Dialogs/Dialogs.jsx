import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"
import React from "react"
import { Redirect } from "react-router-dom"
import { Field, reduxForm } from 'redux-form';
import { Textarea } from './../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from "../../utils/validators/validators"



const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(dialog => <DialogItem id={dialog.id} name={dialog.name} isMale={dialog.isMale} />)
    let messagesElements = state.messages.map(msg => <Message message={msg.message} isMyMessage={msg.isMyMessage} />)


    let addNewMessage = (values) => {
        props.sendNewMessage(values.newMessageBody)
    }

    if(!props.isAuth) {
        return <Redirect to={"/login"} />
    } 

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>

        </div>
    )
}

const maxLength50 = maxLengthCreator(50)

const AddMessageForm = (props) => {
    return (
        <form className={classes.sendMsg} onSubmit={props.handleSubmit}>
            <Field component={Textarea} validate={[required, maxLength50]} name={"newMessageBody"} placeholder="Enter your message" />
                    <button>Send message</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;