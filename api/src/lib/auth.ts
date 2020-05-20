import { db } from 'src/lib/db'
import { AuthenticationError } from '@redwoodjs/api'
import { Magic } from '@magic-sdk/admin'

const mAdmin = new Magic(process.env.MAGICLINK_SECRET)

export const getCurrentUser = async (authToken) => {
  const { email, publicAddress } = await mAdmin.users.getMetadataByToken(
    authToken
  )

  if (!email || !publicAddress) {
    throw new AuthenticationError('Uh, oh')
  }

  let user = await db.user.findOne({ where: { email } })
  if (!user) {
    user = await db.user.create({ data: { email, publicAddress } })
  }
  return user
}

// Use this function in your services to check that a user is logged in, and
// optionally raise an error if they're not.

// export const requireAuth = () => {
//   mAdmin.token.validate(DIDToken);

//   if (!context.currentUser) {
//     throw new AuthenticationError()
//   }
// }
