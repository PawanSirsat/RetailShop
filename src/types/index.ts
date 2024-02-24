export type INavLink = {
  imgURL: string
  route: string
  label: string
}

export type IUpdateUser = {
  userId: string
  name: string
  bio: string
  imageId: string
  imageUrl: URL | string
  file: File[]
}

export type INewPost = {
  productName: string
  productPrice: string
  file: File[]
}

export type IUpdatePost = {
  postId: string
  imageId: string
  imageUrl: URL
  productName: string
  productPrice: string
  file: File[]
}

export type IUser = {
  id: string
  username: string
  email: string
}

export type INewUser = {
  name: string
  email: string
  username: string
  password: string
}
