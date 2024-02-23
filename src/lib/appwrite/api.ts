import { ID, Query } from 'appwrite'

import { account, appwriteConfig, databases } from './config'
import { INewUser } from '@/types'

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )

    if (!newAccount) throw Error

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
    })

    console.log(newUser)

    return newUser
  } catch (error) {
    console.log(error)
    return error
  }
}

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: {
  accountId: string
  email: string
  name: string
  username?: string
}) {
  console.log(user)

  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.adminCollectionId,
      ID.unique(),
      user
    )
    console.log('Added')

    console.log(newUser)

    return newUser
  } catch (error) {
    console.log(error)
  }
}
// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
  try {
    console.log(user)
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    )
    console.log(session)
    return session
  } catch (error) {
    console.log(error)
  }
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get()
    return currentAccount
  } catch (error) {
    console.log(error)
  }
}

// ============================== GET USER
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount()
    console.log(currentAccount)

    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.adminCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    console.log(currentUser.documents[0])

    if (!currentUser) throw Error

    return currentUser.documents[0]
  } catch (error) {
    console.log(error)
    return null
  }
}

// ============================== SIGN OUT
export async function signOutAccount() {
  try {
    const session = await account.deleteSession('current')
    return session
  } catch (error) {
    console.log(error)
  }
}
