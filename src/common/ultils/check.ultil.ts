export function checkInputNotEmpty(input?: string): boolean {
  return input ? input.trim().length > 0 : false;
}
export function isTenDigitNumber(input?: string): boolean {
  const tenDigitNumberPattern = /^\d{10}$/;
  return input ? tenDigitNumberPattern.test(input) : false;
}

export function isOneToTenDigitNumber(input?: string): boolean {
  const oneToTenDigitNumberPattern = /^\d{0,10}$/;
  return input ? oneToTenDigitNumberPattern.test(input) : true;
}
