import InnRepository from '@/repositories/InnRepository'
import { setToken } from '@/repositories/BaseRepository'

export default async ({ store, redirect } : any) => {
    const token = store.state.auth.token
    setToken(token)

    const { data } = await InnRepository.checkExistInn()

    if(!data.exist) {
        redirect('/owner/inn/create')
    }

}