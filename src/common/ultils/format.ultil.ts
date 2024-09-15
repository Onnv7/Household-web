export function formatMoneyString(money?: number): string {
  if (!money) {
    return '';
  }
  return money.toLocaleString('vn-VN', {
    style: 'currency',
    currency: 'VND',
  });
}

export function formatNumber(number: number) {
  return number.toLocaleString('vi-VN');
}

export function formatDate(date: Date) {
  return date.toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });
}
