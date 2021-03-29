import { DispatchAction } from '@/constants/app.vuex'

export default ({ redirect, store }) => {
  if (!store.state.auth.token) {
    store.dispatch(DispatchAction.CLEAR_AUTH)
    redirect('/login')
  }
}
