import { getTokenCookie, getRoleCookie } from '@/utils/cookies'
import { ROLE } from '@/constants/app.constant'
import { setToken } from '@/repositories/BaseRepository'
import { DispatchAction, MutationState } from '@/constants/app.vuex'
import AuthRepository from '@/repositories/AuthRepository'

export default async ({redirect, store}) => {
  const token = getTokenCookie();
  if (token) {
    const role = getRoleCookie()
    store.commit(MutationState.SET_ROLE, role)
    store.commit(MutationState.SET_TOKEN, token)

    setToken(token)

    try {
      switch (role) {
        case ROLE.TENANT:
          await AuthRepository.getTenant()
            .then((response) => {
              store.commit(MutationState.SET_USER, response.data)
            })
            .catch((error) => {
              store.dispatch(DispatchAction.CLEAR_AUTH)
              redirect('/login')
            })
          break
        case ROLE.OWNER:
          await AuthRepository.getOwner()
            .then((response) => {
              store.commit(MutationState.SET_USER, response.data)
            })
            .catch((error) => {
              store.dispatch(DispatchAction.CLEAR_AUTH)
              redirect('/login')
            })
          break
        case ROLE.COLLABORATOR:
          store.commit(MutationState.SET_USER, ROLE.COLLABORATOR)
      }
    } catch (e) {}
  }
}
