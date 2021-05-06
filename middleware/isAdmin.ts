import { ROLE } from '@/constants/app.constant'

export default ({ redirect, store}) => {
  if (!store.state.auth.role || store.state.auth.role != ROLE.ADMIN) {
    redirect('/admin/login')
  }
}
