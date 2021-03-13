import InnRepository from '@/repositories/InnRepository'

export default async function ({ store, redirect } : any) {
    const { data } = await InnRepository.checkExistInn()

    if(data.exist) {
        redirect('/owner/home')
    } else {
        redirect('/owner/create')
    }
}