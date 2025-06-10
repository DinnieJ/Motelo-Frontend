import { AxiosResponse } from 'axios'
import { authenticatedService } from '@/repositories/BaseRepository'

export default class CollaboratorRepository {
    public static getAllCollaborator(): Promise<any> {
        return authenticatedService.get('admin/collaborator/all');
    }

    public static createNewCollaborator(data: any): Promise<any> {
        return authenticatedService.post('admin/collaborator/create', data);
    }

    public static editCollaborator(data: any, id: any): Promise<any> {
        return authenticatedService.post(`admin/collaborator/edit/${id}`, data);
    }

    public static deleteCollaborator(id: any): Promise<any> {
        return authenticatedService.post(`admin/collaborator/delete/${id}`);
    }
}