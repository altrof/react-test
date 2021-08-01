import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus } from '../../redux/profile-reducer';
import {  withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component{
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push("/login")
            }
        } 
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
        
    }
    render() {
            console.log(this.props.fake, "REDNDER PROFILE COMPONENT");
        return (
            <div>
              <Profile {...this.props} profile={this.props.profile} 
                                        status={this.props.status} 
                                        updateStatus={this.props.updateStatus}
                                        fake={this.props.fake} />
            </div>
          )
    }
    
}

// returnit object => ({telo object})
// func => {instrukcija funkcii}
let mapStateToProps = (state) => {
    console.log( state.fake, "MAP STATE TO PROPS");
    return ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    fake: state.usersPage.fake
})
}





export default compose(
        connect(mapStateToProps, {getUserProfile, getStatus, updateStatus }), 
        withRouter, 
        // withAuthRedirect
        )
        (ProfileContainer)