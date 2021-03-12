import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import FormData from 'form-data'
import { GENDER } from '~/constants/app.constant'

export interface CreateInnFormState {
    singleData: any,
}

export enum CreateInnFormMutation {
    SET_NAME = 'setName',
    SET_WATER_PRICE = 'setWaterPrice',
    SET_ELECTRIC_PRICE = 'setElectricPrice',
    SET_OPEN_HOUR = 'setOpenHour',
    SET_OPEN_MINUTE = 'setOpenMinute',
    SET_CLOSE_HOUR = 'setCloseHour',
    SET_CLOSE_MINUTE = 'setCloseMinute',
    SET_FEATURES = 'setFeatures',
    SET_DESCRIPTION = 'setDescription',
    SET_ADDRESS = 'setAddress',
    SET_LOCATION = 'setLocation',
    SET_SECURITY = 'setSecurity'

}

export interface CreateInnAction<S,R> extends ActionTree<S,R> {
    addBasicInfo(context: ActionContext<S,R>, data:any) : void
    addFeatures(context: ActionContext<S,R>, data:any): void
    addSafetyFeatures(context: ActionContext<S,R>, data: any): void
    addLocation(context: ActionContext<S,R>, data: any): void
}

export const state = (): CreateInnFormState => ({
    singleData: {
        name: '',
        water_price: null,
        electric_price: null,
        open_hour: null,
        open_minute: null,
        close_hour: null,
        close_minute: null,
        description: '',
        location: '',
        address: '',
        features: [],
    }
})

export type RootState = ReturnType<typeof state>


export const getters: GetterTree<RootState, RootState> = {
    
}

export const mutations: MutationTree<RootState> = {
    [CreateInnFormMutation.SET_NAME]: (state, name: string) => (state.singleData.name = name),
    [CreateInnFormMutation.SET_WATER_PRICE]: (state, water_price: any) => (state.singleData.water_price = water_price),
    [CreateInnFormMutation.SET_ELECTRIC_PRICE]: (state, electric_price: any) => (state.singleData.electric_price = electric_price),
    [CreateInnFormMutation.SET_OPEN_HOUR]: (state, open_hour: any) => (state.singleData.open_hour = open_hour || 12),
    [CreateInnFormMutation.SET_OPEN_MINUTE]: (state, open_minute: any) => (state.singleData.open_minute = open_minute || 0),
    [CreateInnFormMutation.SET_CLOSE_HOUR]: (state, close_hour: any) => (state.singleData.close_hour = close_hour || 12),
    [CreateInnFormMutation.SET_CLOSE_MINUTE]: (state, close_minute: any) => (state.singleData.close_minute = close_minute || 0),
    [CreateInnFormMutation.SET_FEATURES]: (state, features: Array<any>) => (state.singleData.features = features),
    [CreateInnFormMutation.SET_DESCRIPTION]: (state, description: string) => (state.singleData.description = description),
    [CreateInnFormMutation.SET_LOCATION]: (state, location: string) => (state.singleData.location = location),
    [CreateInnFormMutation.SET_ADDRESS]: (state, address: string) => (state.singleData.address = address),
    [CreateInnFormMutation.SET_SECURITY]: (state, security: number[]) => (state.singleData.features = state.singleData.features.concat(security)),

}

export const actions: CreateInnAction<CreateInnFormState, RootState> = {
    addBasicInfo({ commit, state }, data) {
        commit(CreateInnFormMutation.SET_NAME, data.name)
        commit(CreateInnFormMutation.SET_WATER_PRICE, parseInt(data.water_price))
        commit(CreateInnFormMutation.SET_ELECTRIC_PRICE, parseInt(data.electric_price))

        console.log(state.singleData)
    },

    addFeatures({ commit, state }, data) {
        commit(CreateInnFormMutation.SET_FEATURES, data)
        console.log(state)
    },

    addSafetyFeatures({ commit, state }, data) {
        commit(CreateInnFormMutation.SET_OPEN_HOUR, data.open_hour)
        commit(CreateInnFormMutation.SET_OPEN_MINUTE, data.open_minute)
        commit(CreateInnFormMutation.SET_CLOSE_HOUR, data.close_hour)
        commit(CreateInnFormMutation.SET_CLOSE_MINUTE, data.close_minute)
        commit(CreateInnFormMutation.SET_SECURITY, data.security)
        console.log(data)
        // /console.log(state)
    },

    addLocation({ commit, state }, data) {
        commit(CreateInnFormMutation.SET_ADDRESS, data.address)
        commit(CreateInnFormMutation.SET_LOCATION, data.location)

        let requestData: any = {}

        Object.keys(state.singleData).forEach(function(value, i) {
            requestData[value] = state.singleData[value]
        })

        console.log(state.singleData.features.values())
        //requestData.features = 

        console.log(requestData)
    }


}