export function loginClientErrors(loginCreds) {
  if (!loginCreds.username || !loginCreds.password) {
    return "missing login credentials";
  }
  return "";
}
