export function signupErrors(loginCreds) {
  if (!loginCreds.username || loginCreds.username.split("").length < 4) {
    return "invalid username";
  }
  if (!loginCreds.email || loginCreds.email.split("@")[0].length < 4) {
    return "invalid email";
  }
  if (loginCreds.password.length < 6) {
    return "invalid password";
  }
  if (loginCreds.password !== loginCreds.confirmPassword) {
    return "passwords do not match";
  }
  return "";
}
