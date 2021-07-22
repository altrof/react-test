import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { sendNewMessage } from "../../redux/dialogs-reducer"
import Dialogs from "./Dialogs"


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendNewMessage: (newMessageBody) => {
            dispatch(sendNewMessage(newMessageBody))
        }
    }
}



export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);