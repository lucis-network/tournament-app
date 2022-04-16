/**
 * Add code to JS Error
 * @param code
 * @param msg
 */
export function makeError(code: string | number, msg: string): Error {
  const e = new Error(msg);
  // @ts-ignore
  e.code = code;

  return e
}