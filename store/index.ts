import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { COOKIES, ROLE } from '@/constants/app.constant'
import { AuthMutation } from './auth'
import AuthRepository from '@/repositories/AuthRepository'
import { authenticatedService } from '@/repositories/BaseRepository'

// import AuthRepository from '@/repositories/AuthRepository'

export interface IndexState {}

export enum IndexMutation {}

export interface IndexAction<S, R> extends ActionTree<S, R> {}

export const state = (): IndexState => ({})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {}

export const actions: IndexAction<IndexState, RootState> = {
  async nuxtServerInit({ commit }) {
    const context: any = this
    const token = context.$cookies.get(COOKIES.TOKEN)
    if (token) {
      const role = context.$cookies.get(COOKIES.ROLE)
      commit(`auth/${AuthMutation.SET_ROLE}`, role)
      commit(`auth/${AuthMutation.SET_TOKEN}`, token)
      const user = null

      authenticatedService.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${token}`
          return config
        },
        (error) => {
          Promise.reject(error)
        }
      )

      try {
        switch (role) {
          case ROLE.TENANT:
            await AuthRepository.getTenant(token)
              .then((response) => {
                commit(`auth/${AuthMutation.SET_USER}`, response.data)
              })
              .catch((error) => {
                console.log('nuxtServerInit error', error)
              })
            break
        }
      } catch (e) {}
    }
  },
}
