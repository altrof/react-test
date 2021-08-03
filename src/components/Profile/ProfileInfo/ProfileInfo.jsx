import Preloarder from '../../common/Preloarder/Preloarder';
import style from './ProfileInfo.module.css'
import userPhoto from '../../../assets/images/user.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = (props) => {
  let [editMode, setEditMode] = useState(false)

  //console.log(props.profile);
  if (!props.profile) {
    return <Preloarder />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    props.saveProfile(formData).then(() => {
      setEditMode(false)
    })
  };

  return (
    <div>
      <div className={style.description}>
      <div className={style.tooltip}><ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} /></div>
        <img src={props.profile.photos.large || userPhoto} className={style.userPhoto} />
        <div className={style.changeAvatar}>
          {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
          
        </div>
          { editMode ? <ProfileDataForm setEditMode={setEditMode} initialValues={props.profile} onSubmit={onSubmit} profile={props.profile} /> 
                     : <ProfileData profile={props.profile} 
                                    toEditMode={() => {setEditMode(true)}}
                                    isOwner={props.isOwner} />}
      </div>
    </div>
  )
}

const ProfileData = ({profile, isOwner, toEditMode}) => {
  return <div>
    {isOwner && <div><button onClick={toEditMode}>Edit</button></div>}

    <div>
      <b>Fullname</b>: {profile.fullName}
    </div>

    <div>
      <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
    </div>

    {profile.lookingForAJob &&
    <div>
      <b>My proffesional skills</b>: {profile.lookingForAJobDescription }
    </div> }

    <div>
      <b>About me</b>: {profile.aboutMe}
    </div>

    <div>
      <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
        return <Contact contactTitle={key} contactValue={profile.contacts[key]} />
      })}
    </div>
  </div>
}



const Contact = ({ contactTitle, contactValue }) => {
  return <div className={style.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;