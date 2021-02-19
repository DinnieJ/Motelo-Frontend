import { MutationTree } from 'vuex'

export interface SnackbarState {
    message: string, 
    color: string
}

export enum SnackbarMutation {
    SET_SNACKBAR = 'showMessage'
} 


export type RootState = ReturnType<typeof state>

export const state = (): SnackbarState => ({
    message: "",
    color: ""
})

export const mutations: MutationTree<RootState> = {
    [SnackbarMutation.SET_SNACKBAR]: (state, {message, color}: any) => {
        state.message = message,
        state.color = color
    }
}
