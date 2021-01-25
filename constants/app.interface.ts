export interface NavLink {
    code: string,
    text: string,
    active: boolean,
    to: string,
    role: string[],
}

export interface TextIcon {
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