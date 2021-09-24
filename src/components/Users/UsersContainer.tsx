import React from 'react'
import { connect } from 'react-redux';
import Users from './Users'
import { follow, setCurrentPage, unfollow, toggleFollowingProgress, requestDataUsers } from '../../redux/users-reducer';
import Preloarder from '../common/Preloarder/Preloarder.jsx';
import { getPageSize, getAllUsers, getTotalUsersCount, getCurrentPage, getFollowingInProgress, getIsFetching } from '../../redux/users-selectors';
import { UserType } from '../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    isFetching: boolean
    users: Array<UserType>
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    requestDataUsers: (currentPage: number, pageSize: number) => void
}

type OwnStatePropsType = {
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnStatePropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.requestDataUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.requestDataUsers(pageNumber, this.props.pageSize)
    }

    render() {


        return <>
            {this.props.isFetching ? <Preloarder /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

/* let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
} */

let mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return {
        users: getAllUsers(state), // state.usersPage.users,
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

// Generic
// TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
export default connect<MapStatePropsType, MapDispatchPropsType, OwnStatePropsType, AppStateType>(mapStateToProps, {
    follow, unfollow, requestDataUsers
})(UsersContainer)