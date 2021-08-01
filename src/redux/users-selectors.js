import { createSelector } from "reselect";

/* --- Example: ---
state.usersPage.users. filter, reduce, map и т.д.
будет создаваться новый массив и будет постоянная перерисовка
1. ЛИШНЯЯ ПЕРЕРИСОВКА
2. ЛИШНЯЯ ПЕРЕКАЛЬКУЛЯЦИЯ
3. СЛОЖНО ДЕБАЖИТЬ ТАК КАК SELECTOR ВСЕГДА БУДЕТ ВЫЗЫВАТЬСЯ ИЗ MAPSTATETOPROPS (RERENDER)
  из за этого будем постоянно попадать в ту компоненету которая перерисовалась
*/


export const getAllUsersSelector = (state) => {
    return state.usersPage.users;
}

export const getAllUsers = createSelector(getAllUsersSelector, (users) => {
    return users.filter(u => true)
})

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}
