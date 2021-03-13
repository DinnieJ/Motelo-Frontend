import { ROLE } from '@/constants/app.constant'
import { DispatchAction } from '@/constants/app.vuex'

export default (context: any) => {
const store = context.store
  if (!store.state.auth.role || store.state.auth.role != ROLE.OWNER) {
    store.dispatch(DispatchAction.CLEAR_AUTH)
    context.redirect('/login')
  }
}
