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
    Banner = "banner",
    Room = "room",
    Owner = "owner",
    DetailRoom = "room/detail",
    TenantComment = "tenant/comment",
    TenantFavorite = "tenant/favorite",
    OwnerRoom = "owner/room",
    Collaborator = "collaborator",
    CollaboratorBanner = "collaborator/banner",
    CollaboratorRoom = "collaborator/room",
}