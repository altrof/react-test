// import classes from "../Dialogs.module.css"
import classes from "./Message.module.css"

const Message = (props) => {
        if (props.isMyMessage) {
            return (
                <div className={classes.myMsg}>{props.message}</div>
            )
        } else return (<div className = { classes.notMyMsg } > { props.message }</div>)
}


export default Message;

