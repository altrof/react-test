import React from 'react';
import Profile from './Profile';
import * as axios from 'axios'
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus } from '../../redux/profile-reducer';
import { Redirect, withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component{
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 18259
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
        
    }
    render() {
        
        return (
            <div>
              <Profile {...this.props} profile={this.props.profile} 
                                        status={this.props.status} 
                                        updateStatus={this.props.updateStatus} />
            </div>
          )
    }
    
}

// returnit object => ({telo object})
// func => {instrukcija funkcii}
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})





export default compose(
        connect(mapStateToProps, {getUserProfile, getStatus, updateStatus }), 
        withRouter, 
        // withAuthRedirect
        )
        (ProfileContainer)