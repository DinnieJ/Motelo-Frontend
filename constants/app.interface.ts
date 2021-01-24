export interface NavLink {
    code: string,
    text: string,
    active: boolean,
    to: string
}

export interface Amenitie {
    text: string,
    icon: string,
    code: string
    fas: boolean,
}

export interface Gender {
    text: string,
    icon: string,
    code: string
}

export interface RoomType {
    text: string,
    code: string
}

export interface BreadcrumbLink {
    text: string,
    disabled: boolean,
    href: string,
}