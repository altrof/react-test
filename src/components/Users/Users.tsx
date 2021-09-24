import React from 'react'
import Paginator from '../common/Paginator/Paginator';
import { UserType } from '../types/types';
import User from './User';

type PropsType = {
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const Users: React.FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {

    return (<div>
        <Paginator  currentPage={currentPage} 
                    onPageChanged={onPageChanged} 
                    pageSize={pageSize}
                    totalItemsCount={totalUsersCount}    
                    />
                    <div >
        { users.map(u => <User    key={u.id} 
                                        user={u} 
                                        followingInProgress={props.followingInProgress} 
                                        unfollow={props.unfollow} 
                                        follow={props.follow}   
                                        /> )}
        </div>
    </div>)
}

export default Users;