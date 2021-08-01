import React from 'react'
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import styles from './Users.module.css'

const Users = (props) => {

    return (<div>
        <Paginator  currentPage={props.currentPage} 
                    onPageChanged={props.onPageChanged} 
                    pageSize={props.pageSize}
                    totalItemsCount={props.totalUsersCount}    
                    />
                    <div >
        { props.users.map(u => <User    key={u.id} 
                                        user={u} 
                                        followingInProgress={props.followingInProgress} 
                                        unfollow={props.unfollow} 
                                        follow={props.follow}   
                                        /> )}
        </div>
    </div>)
}

export default Users;