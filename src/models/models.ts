export interface ListType {
    id: number
    name: string
    description: string
    group?: GroupType
}

export interface ItemType {
    id: number
    listId: number
    name: string
    description: string
    picture?: string
    addedAt: string
}

export interface GroupType {
    id: number
    name: string
}

export interface MyGroupsType {
    id: number
    group: GroupType
}

export interface UserType {
    id: number
    email: string
    firstName: string
    lastName: string
    picture?: string
}