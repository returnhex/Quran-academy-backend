import USER_ROLE from "../../constants/userRole"

export interface IUser {
  name: string
  email: string
  password: string
  image?: string
  role: "admin" | "student"
  status: 'approved' | 'blocked'
  isDeleted: boolean
}

export type TUserRole = keyof typeof USER_ROLE
