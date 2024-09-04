export function isValidNumber(value: string): boolean {
  // Chuyển đổi giá trị đầu vào thành số
  const numberValue = Number(value);

  // Kiểm tra nếu giá trị đã chuyển đổi không phải là NaN và là một số hữu hạn
  return !isNaN(numberValue) && Number.isFinite(numberValue);
}
