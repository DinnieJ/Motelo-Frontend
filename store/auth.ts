import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { LoginDTO, RegisterDTO } from '@/constants/app.interface'
import { setTokenCookie, removeTokenCookie } from '@/utils/cookies'
import AuthRepository from '@/repositories/AuthRepository'

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
    register(context: ActionContext<S, R>, registerInfo: RegisterDTO): Promise<any>
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

export const actions: AuthAction<AuthState, RootState> = {
    async login({ commit }, loginInfo): Promise<any> {
        try {
            const data = await AuthRepository.getUser(loginInfo);
            commit(AuthMutation.SET_TOKEN, data.token)
            commit(AuthMutation.SET_USER, data.user)
            // console.log("user from state", data.user)
            setTokenCookie(data.token)
            return data
        } catch (error) {
            return false
        }
    },

    async register( context, registerInfo): Promise<any> {
        try {
            const data = await AuthRepository.register(registerInfo);
            return data
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