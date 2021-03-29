import { getTokenCookie, getRoleCookie } from '@/utils/cookies'
import { ROLE } from '@/constants/app.constant'
import { AuthMutation } from '@/store/auth'
import { setToken } from '@/repositories/BaseRepository'
import { DispatchAction } from '@/constants/app.vuex'
import AuthRepository from '@/repositories/AuthRepository'

export default async ({redirect, store}) => {
  const token = getTokenCookie();

  if (token) {
    const role = getRoleCookie()
    store.commit(`auth/${AuthMutation.SET_ROLE}`, role)
    store.commit(`auth/${AuthMutation.SET_TOKEN}`, token)
    const user = null

    setToken(token)

    try {
      switch (role) {
        case ROLE.TENANT:
          await AuthRepository.getTenant()
            .then((response) => {
              store.commit(`auth/${AuthMutation.SET_USER}`, response.data)
            })
            .catch((error) => {
              store.dispatch(DispatchAction.CLEAR_AUTH)
              redirect('/login')
            })
          break
        case ROLE.OWNER:
          await AuthRepository.getOwner()
            .then((response) => {
              store.commit(`auth/${AuthMutation.SET_USER}`, response.data)
            })
            .catch((error) => {
              store.dispatch(DispatchAction.CLEAR_AUTH)
              redirect('/login')
            })
          break
      }
    } catch (e) {}
  }
}
