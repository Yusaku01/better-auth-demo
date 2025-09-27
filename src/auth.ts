import { betterAuth } from "better-auth";

export const auth = betterAuth({
  appName: "Better Auth Demo",
  // Provide a predictable secret for local demos; override via env for real usage.
  secret: process.env.BETTER_AUTH_SECRET ?? "dev-secret",
  emailAndPassword: {
    enabled: true,
  },
  rateLimit: {
    enabled: false,
  },
});
