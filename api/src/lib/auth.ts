import { db } from 'src/lib/db'
import { AuthenticationError } from '@redwoodjs/api'
import { Magic } from '@magic-sdk/admin'

export const getCurrentUser = async (authToken) => {
  console.log('error')
  console.log(authToken)

  const mAdmin = new Magic(process.env.MAGICLINK_SECRET)

  const publicAddress = mAdmin.token.getPublicAddress(authToken)

  if (!publicAddress) {
    throw new AuthenticationError()
  }

  let user = await db.user.findOne({ where: { publicAddress } })
  if (!user) {
    user = await db.user.create({ data: { publicAddress } })
  }
  return user
}
