export const isClient = typeof window !== "undefined";
export const isDevMode = process.env.NODE_ENV === "development";
export const isClientDevMode = isDevMode && isClient;
export const app_env: string = "APP_ENV"; // This will be override in compile phase by webpack

console.log('{} app_env, isClient, isDevMode, isClientDevMode: ', app_env, isClient, isDevMode, isClientDevMode);
