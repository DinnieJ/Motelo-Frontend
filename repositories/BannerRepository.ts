import { AxiosResponse } from 'axios'
import { authenticatedService } from '@/repositories/BaseRepository'
import { Endpoint } from '~/constants/app.endpoint'

export default class BannerRepository {
    public static getHomepageBanner(): Promise<AxiosResponse<any>> {
        return authenticatedService.get(`${Endpoint.Banner}/home`);
    }

    public static createBanner(data :any) : Promise<AxiosResponse<any>> {
        return authenticatedService.post(`${Endpoint.CollaboratorBanner}/create`, data, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        })
    }

    public static getBanner(id: any) : Promise<AxiosResponse<any>> {
        return authenticatedService.get(`${ Endpoint.CollaboratorBanner }/detail/${ id }`)
    }

    public static deleteBanner(id: any) : Promise<AxiosResponse<any>> {
        return authenticatedService.post(`${ Endpoint.CollaboratorBanner }/delete/${ id }`)
    }

    public static updateBanner(id:any, data :any) : Promise<AxiosResponse<any>> {
        return authenticatedService.post(`${Endpoint.CollaboratorBanner}/update/${ id }`, data, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        })
    }

    public static getBannerList(status, page) : Promise<AxiosResponse<any>> {
        return authenticatedService.get(`${Endpoint.CollaboratorBanner}/all`, { params: { status, page } })
    }

}