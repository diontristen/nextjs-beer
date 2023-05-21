import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID ?? '',
          clientSecret: process.env.GOOGLE_SECRET ?? '',
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID ?? '',
            clientSecret: process.env.FACEBOOK_SECRET ?? '',
          }),
      ],
      secret: process.env.SECRET,
      session: {
        strategy: 'jwt'
      },
      pages: {
        // signIn: '/auth/signin',
      },
      jwt: {
        secret: process.env.SECRET,
      },
      events: {},
      debug: false,
}

export default NextAuth(authOptions)