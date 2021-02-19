import { MutationState } from '@/constants/app.vuex'

export default ({ app, store }: any, inject: any) => {
  inject('notify', {
    showMessage({ message , color }: any) {
      store.commit(MutationState.SHOW_SNACKBAR, { message, color })
    },
  })
}
