import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { LoginDTO, TenantRegisterDTO } from '@/constants/app.interface'
import { setTokenCookie, removeTokenCookie } from '@/utils/cookies'
import AuthRepository from '@/repositories/AuthRepository'

export interface AuthState {
    token: string
    user: any,
    role: string
}

export enum AuthMutation {
    SET_TOKEN = 'setToken',
    SET_USER = 'setUser',
    SET_ROLE = 'setRole'
}

export interface AuthAction<S, R> extends ActionTree<S, R> {
    login(context: ActionContext<S, R>, loginInfo: LoginDTO): Promise<any>
    // logout(context: ActionContext<S, R>): Promise<any>
    clear(context: ActionContext<S, R>): void
}

export const state = (): AuthState => ({
    token: "",
    user: null,
    role: ""
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    token: state => state.token,
    user: state => state.user,
    role: state => state.role
}

export const mutations: MutationTree<RootState> = {
    [AuthMutation.SET_TOKEN]: (state, token: string) => (state.token = token),

    [AuthMutation.SET_USER]: (state, user: any) => (state.user = user),

    [AuthMutation.SET_ROLE]: (state, role: string) => (state.role = role)
}

export const actions: AuthAction<AuthState, RootState> = {
    async login({ commit }, loginInfo): Promise<any> {
        try {
            const { data } = await AuthRepository.login(loginInfo);
            commit(AuthMutation.SET_TOKEN, data.token)
            commit(AuthMutation.SET_USER, data.user)
            commit(AuthMutation.SET_ROLE, data.role)
            setTokenCookie(data.token)
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