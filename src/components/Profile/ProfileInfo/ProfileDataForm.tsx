import {FormControl} from '../../common/FormsControls/FormsControls';
import { Field, reduxForm } from 'redux-form';
import { Input, Textarea } from '../../common/FormsControls/FormsControls';
import styles from './../../common/FormsControls/FormsControls.module.css';
import style from './ProfileInfo.module.css'


const ProfileDataForm = ({handleSubmit, setEditMode, profile, error}) => {
    return <form onSubmit={handleSubmit}>
    
    <div><button>Save</button><button onClick={() => setEditMode(false)}>Cancel</button></div>
    { error && <div className={styles.formSummaryError}>
             {error} 
             </div>}
    <div>
      <b>Fullname</b>: <Field name={"fullName"} component={Input} />
    </div>
    <div>
      <b>Looking for a job</b>: <Field name={"lookingForAJob"} component={Input} type={"checkbox"} />
    </div>
    <div>
      <b>My proffesional skills</b>: <Field placeholder={"Your proffesional skills"} name={"lookingForAJobDescription"} component={Textarea} />
    </div>
    <div>
      <b>About me</b>: <Field placeholder={"Write something about you"} name={"aboutMe"} component={Textarea} />
    </div>
    <div>
      <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
        return <div className={style.contact}>
          <b>{key}:</b> <Field placeholder={key} name={"contacts." + key} component={Input} />
        </div>
      })}
    </div>
  </form>
}


export default reduxForm({form: 'ProfileEdit'})(ProfileDataForm);