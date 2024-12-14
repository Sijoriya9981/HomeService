import NextAuth from "next-auth/next";


export const authOptions = {
    providers: [
        {
            id: "descope",
            name: "Descope",
            type: "oauth",
            wellKnown: `https://api.descope.com/${process.env.DESCOPE_ID}/.well-known/openid-configuration`,
            authorization: { params: { scope: "openid email profile" } },
            idToken: true,
            clientId: process.env.DESCOPE_ID,

            checks: ["pkce", "state"],
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                }
            },
        }],
    secret: "qwerty"
}
console.log(process.env.DESCOPE_ID)

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
