// import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
// import { COOKIES, ROLE } from '@/constants/app.constant'
// import { AuthMutation } from './auth'
// import { DispatchAction } from '@/constants/app.vuex'
// import AuthRepository from '@/repositories/AuthRepository'
// import { setToken } from '@/repositories/BaseRepository'

// // import AuthRepository from '@/repositories/AuthRepository'

// export interface IndexState {}

// export enum IndexMutation {}

// export interface IndexAction<S, R> extends ActionTree<S, R> {}

// export const state = (): IndexState => ({})

// export type RootState = ReturnType<typeof state>

// export const getters: GetterTree<RootState, RootState> = {}

// export const mutations: MutationTree<RootState> = {}

// export const actions: IndexAction<IndexState, RootState> = {
//   async nuxtServerInit({ commit, dispatch }, { redirect }) {
//     const context: any = this
//     const token = context.$cookies.get(COOKIES.TOKEN)
//     if (token) {
//       const role = context.$cookies.get(COOKIES.ROLE)
//       commit(`auth/${AuthMutation.SET_ROLE}`, role)
//       commit(`auth/${AuthMutation.SET_TOKEN}`, token)
//       const user = null

//       setToken(token)

//       try {
//         switch (role) {
//           case ROLE.TENANT:
//             await AuthRepository.getTenant()
//               .then((response) => {
//                 commit(`auth/${AuthMutation.SET_USER}`, response.data)
//               })
//               .catch((error) => {
//                 dispatch(DispatchAction.CLEAR_AUTH)
//                 redirect('/login')
//               })
//             break
//           case ROLE.OWNER:
//             await AuthRepository.getOwner()
//               .then((response) => {
//                 commit(`auth/${AuthMutation.SET_USER}`, response.data)
//               })
//               .catch((error) => {
//                 dispatch(DispatchAction.CLEAR_AUTH)
//                 redirect('/login')
//               })
//             break
//         }
//       } catch (e) {}
//     }
//   },
// }

/**
 * eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOC4xNjcuNjguMjE5XC9hcGlcL2F1dGhcL3RlbmFudFwvbG9naW4iLCJpYXQiOjE2MTcwMjA4NjAsImV4cCI6MTYxNzAyNDQ2MCwibmJmIjoxNjE3MDIwODYwLCJqdGkiOiJPakZ4M1F5YTNhNFZ2MG5JIiwic3ViIjozLCJwcnYiOiI0MzI2MzM3NWY3ZmZkNmEyY2U1ZjM4YmU5MzhmZDEyZTNmMDc5ZmFlIiwicm9sZSI6InRlbmFudCJ9.49ZcJ4TyjL2ti12q3Pw06WVbxZqhXatr5_JHC184bfw
 */
