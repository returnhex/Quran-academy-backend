import { ObjectId } from "mongoose"

export interface IStudent {
    user: ObjectId
    name: string
    email: string,
    image?: string,
    contact: string,
    address: string,
    isDeleted: boolean
}