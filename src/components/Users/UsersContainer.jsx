import React from 'react'
import { connect } from 'react-redux';
import Users from './Users'
import { follow, setCurrentPage, unfollow, toggleFollowingProgress, requestDataUsers } from '../../redux/users-reducer';
import Preloarder from '../common/Preloarder/Preloarder.jsx';
import { getPageSize, getAllUsers, getTotalUsersCount, getCurrentPage, getFollowingInProgress, getIsFetching } from '../../redux/users-selectors';

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestDataUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
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

let mapStateToProps = (state) => {
    return {
        users: getAllUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default connect(mapStateToProps, {
    follow, unfollow, setCurrentPage, 
    toggleFollowingProgress, requestDataUsers
})(UsersContainer)