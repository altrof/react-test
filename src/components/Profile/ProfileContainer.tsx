import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import {  withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../types/types';

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    getStatus: (userId: number) => void
    getUserProfile: (userId: number) => void
    savePhoto: () => void
    updateStatus: () => void
    saveProfile: () => void
}

type OwnStatePropsType = {

}

type StateType = {
    match: any
    
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnStatePropsType


class ProfileContainer extends React.Component<PropsType, StateType> {
    refreshProfile() {
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

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if(this.props.match.params.userId != prevProps.match.params.userId){
            this.refreshProfile()
        }
    }

    render() {
        return (
            <div>
              <Profile {...this.props} profile={this.props.profile} 
                                        status={this.props.status} 
                                        updateStatus={this.props.updateStatus}
                                        isOwner={!this.props.match.params.userId}
                                        savePhoto={this.props.savePhoto} />
            </div>
          )
    }
    
}

// returnit object => ({telo object})
// func => {instrukcija funkcii}
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})
}





export default compose(
        connect<MapStatePropsType, MapDispatchPropsType, OwnStatePropsType, AppStateType>(mapStateToProps, 
            {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }), 
        withRouter, 
        // withAuthRedirect
        )
        (ProfileContainer)