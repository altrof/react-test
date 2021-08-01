import Preloarder from '../../common/Preloarder/Preloarder';
import classes from './ProfileInfo.module.css'
import userPhoto from '../../../assets/images/user.png'
import ProfileStatus from './ProfileStatus.jsx'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloarder />
  } return (
    <div>
      {/* <div>
        <img src="https://fcw.com/-/media/GIG/EDIT_SHARED/Analytics_Data/matrix_style_data.jpg" />
      </div> */}
      <div className={classes.description}>
        <img src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto} className={classes.userPhoto} />
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
      </div>
    </div>
  )
}

export default ProfileInfo;