import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { LoginDTO, TenantRegisterDTO, UserInfoDTO } from '@/constants/app.interface'
import { ROLE, COOKIES } from '@/constants/app.constant'
import AuthRepository from '@/repositories/AuthRepository'
import { setToken } from '@/repositories/BaseRepository'

import { setTokenCookie, setRoleCookie, removeTokenCookie, removeRoleCookie } from '@/utils/cookies'

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
    logout(context: ActionContext<S, R>): Promise<any>
    clear(context: ActionContext<S, R>): void
    setUser(context: ActionContext<S, R>, userInfo: UserInfoDTO): void
}

export const state = (): AuthState => ({
    token: "",
    user: null,
    role: ROLE.GUEST,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    token: state => state.token,
    user: state => state.user,
    role: state => state.role,
    isTenant: state => state.role == ROLE.TENANT,
    isCollaborator: state => state.role == ROLE.COLLABORATOR,
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

            setToken(data.token)
    
            // const options = {
            //     path: '/',
            //     maxAge: 60*60*24, // cookies live in 1 day
            //     sameSite: true,
            // }
            // const cookieList = [
            //     { name: COOKIES.TOKEN, value: data.token, opts: options },
            //     { name: COOKIES.ROLE, value: data.role, opts: options },
            //   ]
            // const cookies: any = this.$cookies
            // cookies.setAll(cookieList);

            setTokenCookie(data.token);
            setRoleCookie(data.role);

            return data
        } catch (error) {
            return false
        }
    },
    async logout({commit, state}) {
        try {
            const role = state.role
            
            // delete data in vuex before BE to ensure API is successful or not, all delete data in FE
            commit(AuthMutation.SET_TOKEN, "")
            commit(AuthMutation.SET_USER, null)
            commit(AuthMutation.SET_ROLE, ROLE.GUEST)

            removeTokenCookie()
            removeRoleCookie()

            switch (role) {
                case ROLE.TENANT:
                    await AuthRepository.logoutTenant();
                    break;
                case ROLE.OWNER:
                    await AuthRepository.logoutOwner();
                    break;
            }

            setToken(false)
            
            return true
        } catch ( error ) {
            return false
        }
    },

    clear({ commit }): void {
        commit(AuthMutation.SET_TOKEN, "")
        commit(AuthMutation.SET_USER, null)
        commit(AuthMutation.SET_ROLE, ROLE.GUEST)

        removeTokenCookie()
        removeRoleCookie()
        setToken(false)
    },

    setUser({ commit }, userInfo ) {
        commit(AuthMutation.SET_USER, userInfo)
    }
}