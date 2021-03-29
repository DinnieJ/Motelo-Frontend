import InnRepository from '@/repositories/InnRepository'

export default async ({ store, redirect } : any) => {
    const { data } = await InnRepository.checkExistInn()

    if(!data.exist) {
        redirect('/owner/inn/create')
    }

}