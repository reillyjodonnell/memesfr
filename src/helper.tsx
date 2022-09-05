export function formatPhoneNumber(number: String) {
  var match = number.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
}
export function isOnlyNumbers(passedInput: string) {
  return /^\d+$/.test(passedInput);
}
export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}
export function isValidPassword(password: string) {
  return /^(?=.*?[A-Za-z])(?=.*?[0-9]).{7,}$/.test(password);
}
