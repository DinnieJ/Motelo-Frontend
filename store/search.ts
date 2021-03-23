import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { PRICE_FILTER } from '~/constants/app.constant'
import RoomRepository from '~/repositories/RoomRepository'


export interface FilterState {
    keyword: string,
    min_price: number,
    max_price: number,
    features: any[],
    room_type: any[],
    gender: number,
    page: number
}

export enum FilterMutation {
    SET_KEYWORD = 'setKeyword',
    SET_MIN_PRICE = 'setMinPrice',
    SET_MAX_PRICE = 'setMaxPrice',
    SET_FEATURES = 'setFeatures',
    SET_ROOM_TYPE = 'setRoomType',
    SET_GENDER = 'setGender',
    SET_PAGE = 'setPage'
}

export interface FilterAction<S,R> extends ActionTree<S,R> {
    filterSearch(context: ActionContext<S, R>): Promise<any>,
    clearFilter(context: ActionContext<S,R>): void
}

export const state = (): FilterState => ({
    keyword: '',
    min_price: PRICE_FILTER.MIN,
    max_price: PRICE_FILTER.MAX,
    features: [],
    room_type: [],
    gender: 1,
    page: 1
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    keyword: state => state.keyword,
    min_price: state => state.min_price,
    max_price: state => state.max_price,
    features: state => state.features,
    room_type: state => state.room_type,
    gender: state => state.gender,
    page: state => state.page
}

export const mutations: MutationTree<RootState> = {
    [FilterMutation.SET_KEYWORD]: (state, keyword) => (state.keyword = keyword),
    [FilterMutation.SET_MIN_PRICE]: (state, min_price) => (state.min_price = min_price),
    [FilterMutation.SET_MAX_PRICE]: (state, max_price) => (state.max_price = max_price),
    [FilterMutation.SET_FEATURES]: (state, features) => (state.features = features),
    [FilterMutation.SET_ROOM_TYPE]: (state, room_type) => (state.room_type = room_type),
    [FilterMutation.SET_GENDER]: (state, gender) => (state.gender = gender),
    [FilterMutation.SET_PAGE]: (state, page) => (state.page = page),
}

export const actions: FilterAction<FilterState, RootState> = {
    async filterSearch({ commit, state }) : Promise<any> {
        let params: any = {
            keyword: state.keyword,
            min_price: state.min_price * 1000000,
            max_price: state.max_price * 1000000,
            gender: state.gender,
            page: state.page
        }

        if(state.features.length > 0) {
            params.features = state.features.join(',')
        }

        if(state.room_type.length > 0) {
            params.room_type = state.room_type.join(',')
        }

        try {
          const { data } = await RoomRepository.getRoomsByFilter(params)

          return data
        } catch(e) {
            return null
        }
    },

    clearFilter({ commit }) {
        commit(FilterMutation.SET_KEYWORD, '')
        commit(FilterMutation.SET_GENDER, 1)
        commit(FilterMutation.SET_FEATURES, [])
        commit(FilterMutation.SET_MIN_PRICE, PRICE_FILTER.MIN)
        commit(FilterMutation.SET_MAX_PRICE, PRICE_FILTER.MAX)
        commit(FilterMutation.SET_ROOM_TYPE, [])
        commit(FilterMutation.SET_PAGE, 1)
    }
}