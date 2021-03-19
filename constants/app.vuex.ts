/**
 * Vuex constant
 */

export enum DispatchAction {
    //Vuex action constant
    LOGIN = "auth/login",
    REGISTER = "auth/register",
    LOGOUT = "auth/logout",
    CLEAR_AUTH = "auth/clear",
    SET_AUTH = "auth/setUser",
    ADD_BASIC_INN_INFO = "new-inn/addBasicInfo",
    ADD_INN_FEATURES = "new-inn/addFeatures",
    ADD_SECURITY_INFO = "new-inn/addSafetyFeatures",
    ADD_LOCATION_INFO = "new-inn/addLocation",
    CREATE_INN = "new-inn/createInn",
    FILTER_ROOM = "search/filterSearch",
    CLEAR_FILTER = "search/clearFilter",
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

    SEARCH_KEYWORD = "search/keyword",
    SEARCH_MIN_PRICE = "search/min_price",
    SEARCH_MAX_PRICE = "search/max_price",
    SEARCH_FEATURES = "search/features",
    SEARCH_ROOM_TYPE = "search/room_type",
    SEARCH_GENDER = "search/gender",
    LOADING_IMG = "loadingImg",
    IS_TENANT = 'auth/isTenant',
}
