/**
 * Vuex constant
 */

export enum DispatchAction {
    //Vuex action constant
    LOGIN = "auth/login",
    REGISTER = "auth/register",
    LOGOUT = "auth/logout",
    CLEAR_AUTH = "auth/clear"
}

export enum MutationState {
    // Vuex mutation tree constant
    SHOW_SNACKBAR = 'snackbar/showMessage',
    SET_TOKEN = "auth/setToken",
    SET_USER = "auth/setUser",
    SET_ROLE = "auth/setRole"
}

export enum Getter {
    // Vuex getter tree constant
    USER = "auth/user",
    ROLE = "auth/role",
    TOKEN = "auth/token",
}
