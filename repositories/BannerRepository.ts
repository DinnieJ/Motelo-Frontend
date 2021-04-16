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

    public static getBannerList(status, page) : Promise<AxiosResponse<any>> {
        return authenticatedService.get(`${Endpoint.CollaboratorBanner}/all`, { params: { status, page } })
    }

}