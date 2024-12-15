import { Lucia } from "lucia";
//import { dev } from "$app/env";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const adapter = new PrismaAdapter(client.session, client.user)
// expect error (see next section)
export const auth = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
           // secure: !dev
        }
    },
    getUserAttributes:  (attributes)=>{
        return {
            email: attributes.email
        }
    }
});

export type Auth = typeof auth;