/**
 * Contain all the api endpoint
 * 
 * 
 */

export enum Endpoint {
    Auth = "auth",
    AuthTenant = "auth/tenant",
    AuthOwner = "auth/owner",
    AuthCollaborator = "auth/collaborator",
    Room = "room",
    Owner = "owner",
    DetailRoom = "room/detail",
    TenantComment = "tenant/comment",
    TenantFavorite = "tenant/favorite",
    OwnerRoom = "owner/room",
    Collaborator = "collaborator",
    CollaboratorRoom = "collab/room",
}