import { ROLE } from '@/constants/app.constant'

export default (context: any) => {
const store = context.store
  if (!store.state.auth.role || store.state.auth.role != ROLE.TENANT) {
    context.redirect('/login')
  }
}
