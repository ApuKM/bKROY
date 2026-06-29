import { betterAuth } from "better-auth";
import { db, client } from "./db";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      role: {
        defaultValue: "buyer",
        input: true,
      },
      phone: {
        type: "string",
        required: false,
      },
      location: {
        type: "string",
        required: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Because input is true, user.role now contains what the frontend sent.
          // SECURITY CHECK: We sanitize it here to prevent a hacker from sending "admin"

          if (user.role === "seller") {
            user.role = "seller";
          } else {
            // If they sent "buyer", "admin", "supergod", or left it empty -> force "buyer"
            user.role = "buyer";
          }

          return user;
        },
      },
    },
  },
});
