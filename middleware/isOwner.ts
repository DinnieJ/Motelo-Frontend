import { ROLE } from '@/constants/app.constant'
import { DispatchAction } from '@/constants/app.vuex'

export default ({ redirect, store, error}) => {
  if (!store.state.auth.role || store.state.auth.role != ROLE.OWNER) {
    error({statusCode: 403})
  }
}
