import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { LoginDTO } from '@/constants/app.interface'
import { setTokenCookie, removeTokenCookie } from '@/utils/cookies'

export interface AuthState {
    token: string
    user: any
}

export enum AuthMutation {
    SET_TOKEN = 'setToken',
    SET_USER = 'setUser'
}

export interface AuthAction<S, R> extends ActionTree<S, R> {
    login(context: ActionContext<S, R>, loginInfo: LoginDTO): Promise<any>
    // logout(context: ActionContext<S, R>): Promise<any>
    clear(context: ActionContext<S, R>): void
}

export const state = (): AuthState => ({
    token: "",
    user: null,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    token: state => state.token,
    user: state => state.user
}

export const mutations: MutationTree<RootState> = {
    [AuthMutation.SET_TOKEN]: (state, token: string) => (state.token = token),

    [AuthMutation.SET_USER]: (state, user: any) => (state.user = user)
}

// fake api
// pseudo database
let userTenant = {
      id: '1',
      email: 'namdthe130237@fpt.edu.vn',
      password: 'daotienam'
}

let UserOwner = {
    id: '1',
    email: 'namdthe130238@fpt.edu.vn',
    password: 'daotienam'
}

const getUser: any = (loginInfo: LoginDTO) => 
    new Promise((resolve, reject) => {
        if (loginInfo.userType === 0 && loginInfo.email === userTenant.email && loginInfo.password === userTenant.password) {
            console.log("login success for tenant");
            return setTimeout(() => resolve({data:"TENANT"}), 500)
        }
        if (loginInfo.userType === 1 && loginInfo.email === UserOwner.email && loginInfo.password === UserOwner.password) {
            console.log("login success for owner");
            return setTimeout(() => resolve({data:"OWNER"}), 500)
        }
        console.log("login fail");
        return setTimeout(() => reject(new Error("User not found!")), 500)
    })

export const actions: AuthAction<AuthState, RootState> = {
    async login({ commit }, loginInfo): Promise<any> {
        try {
            const { data } = await getUser(loginInfo);
            commit(AuthMutation.SET_TOKEN, data.token)
            commit(AuthMutation.SET_USER, data.user)
            console.log("user from state", data.user)
            setTokenCookie(data.token)
            return true
        } catch (error) {
            return false
        }
    },
    // async logout({commit}) {
    //     try {
    //         await AuthRepository.logout()
    //         commit(AuthMutation.SET_TOKEN, "")
    //         commit(AuthMutation.SET_USER, null)
    //         removeTokenCookie()
    //         return true
    //     } catch ( error ) {
    //         return false
    //     }
    // },

    clear({ commit }): void {
        commit(AuthMutation.SET_TOKEN, "")
        commit(AuthMutation.SET_USER, null)
        removeTokenCookie()
    }
}