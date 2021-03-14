import InnRepository from '@/repositories/InnRepository'

export default async ({ redirect } : any) => {
    const { data } = await InnRepository.checkExistInn()

    if(!data.exist) {
        redirect('/owner/create')
    }

}