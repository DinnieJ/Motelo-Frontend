import { DispatchAction } from '@/constants/app.vuex'

export default ({ redirect, store }) => {
  console.log('authenticated', store.state.auth.token)
  if (!store.state.auth.token) {
    store.dispatch(DispatchAction.CLEAR_AUTH)
    redirect('/login')
  }
}
