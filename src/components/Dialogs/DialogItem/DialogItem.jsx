import { NavLink } from "react-router-dom";
import classes from "./DialogItem.module.css"

const DialogItem = (props) => {
    let path = `/dialogs/${props.id}`;
    let imgGender = () => {
        if (props.isMale) {
            return "https://w7.pngwing.com/pngs/21/228/png-transparent-computer-icons-user-profile-others-miscellaneous-face-monochrome.png"
        } else return "https://www.clipartmax.com/png/middle/296-2960595_female-profile-filled-icon-female-user-icon-png.png"
    }
    return (<NavLink to={path} activeClassName={classes.active}>
                 
            <div className={classes.dialog}>
             <div className={classes.avatar}><img src={imgGender()} /></div>
             <div className={classes.dialogBlock}>
                
             <div className={classes.name} >{props.name}</div>
                    <div className={classes.lastmsg}>here is last message..</div>
                </div>
                
                </div>
            </NavLink>
        
    )
}


export default DialogItem;