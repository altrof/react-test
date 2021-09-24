import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

/* --- Example: ---
state.usersPage.users. filter, reduce, map и т.д.
будет создаваться новый массив и будет постоянная перерисовка
1. ЛИШНЯЯ ПЕРЕРИСОВКА
2. ЛИШНЯЯ ПЕРЕКАЛЬКУЛЯЦИЯ
3. СЛОЖНО ДЕБАЖИТЬ ТАК КАК SELECTOR ВСЕГДА БУДЕТ ВЫЗЫВАТЬСЯ ИЗ MAPSTATETOPROPS (RERENDER)
  из за этого будем постоянно попадать в ту компоненету которая перерисовалась
*/


export const getAllUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
}

export const getAllUsers = createSelector(getAllUsersSelector, (users) => {
    return users.filter(u => true)
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}
