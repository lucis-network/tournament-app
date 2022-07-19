import { AuthUser } from "./AuthStore";
import { isClient } from "../../utils/DOM";
import { setAuthToken } from "../../utils/apollo_client";
import { isClientDevMode } from "../../utils/Env";
import { AuthGameUser } from "./AuthGameStore";

// ----- Solution: https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
function toBinary(string: string) {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  // @ts-ignore
  return window.btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
}

function fromBinary(encoded: string) {
  const binary = window.atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  // @ts-ignore
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}

export function setLocalAuthInfo(user: AuthUser): void {
  // localStorage.setItem('user', window.btoa(JSON.stringify(user)))
  localStorage.setItem("user", toBinary(JSON.stringify(user)));
}


export function setLocalAuthGameInfo(gamer: AuthGameUser): void {
  // localStorage.setItem('user', window.btoa(JSON.stringify(user)))
  localStorage.setItem("gameAccounts", toBinary(JSON.stringify(gamer)));
}

export function getLocalAuthInfo(): AuthUser | null {
  try {
    const user_encoded = localStorage.getItem("user");
    if (typeof user_encoded === "string") {
      // const user_plaintext = window.atob(user_encoded);
      const user_plaintext = fromBinary(user_encoded);

      return JSON.parse(user_plaintext);
    }

    return null;
  } catch (e) {
    return null;
  }
}

export function getLocalAuthGameInfo(): AuthGameUser | null {
  try {
    const user_encoded = localStorage.getItem("gameAccounts");
    if (typeof user_encoded === "string") {
      // const user_plaintext = window.atob(user_encoded);
      const user_plaintext = fromBinary(user_encoded);

      return JSON.parse(user_plaintext);
    }

    return null;
  } catch (e) {
    return null;
  }
}

export function clearLocalAuthInfo(): void {
  localStorage.setItem("user", "");
  localStorage.setItem("gameAccounts", "");
}

export function debug__forceToken_LocalAuthInfo(
  token: string,
  user_id?: number
): void {
  const u = getLocalAuthInfo()!;
  u.token = token;
  u.id = user_id;
  setLocalAuthInfo(u);
}
if (isClient) {
  // @ts-ignore
  window.tmp__debug__forceToken_LocalAuthInfo = debug__forceToken_LocalAuthInfo;
  // @ts-ignore
  window.tmp__encode = {
    toBinary,
    fromBinary,
  }
}
