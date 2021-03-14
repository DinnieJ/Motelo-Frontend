import { DispatchAction } from '@/constants/app.vuex'

export default (context: any) => {
  const store = context.store
  if (!store.state.auth.token) {
    store.dispatch(DispatchAction.CLEAR_AUTH)
    context.redirect('/login')
  }
}
