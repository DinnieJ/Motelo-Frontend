import { MutationState } from '@/constants/app.vuex'

export default ({ app, store }: any, inject: any) => {
  inject('notify', {
    showMessage({ message , color }: any) {
      console.log('inject notify')
      
      store.commit(MutationState.SHOW_SNACKBAR, { message, color })
    },
  })
}
