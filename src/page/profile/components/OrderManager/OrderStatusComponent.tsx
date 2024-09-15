import { OrderBillStatus } from '../../../../common/enum/enum';
type OrderStatusComponentProps = {
  status: OrderBillStatus;
};
function OrderStatusComponent({ status }: OrderStatusComponentProps) {
  let textStatus = '';
  let className = '';
  switch (status) {
    case OrderBillStatus.CREATED:
      textStatus = 'Đang xác nhận';
      className = 'border-yellow-400 bg-yellow-200';
      break;
    case OrderBillStatus.PROCESSING:
      textStatus = 'Đã xác nhận';
      className = 'border-cyan-400 bg-cyan-200';
      break;
    case OrderBillStatus.PENDING_PICKUP:
      textStatus = 'Chuẩn bị giao';
      className = 'border-orange-400 bg-orange-200';
      break;
    case OrderBillStatus.COMPLETED:
      textStatus = 'Thành công';
      className = 'border-green-400 bg-green-200';
      break;
    case OrderBillStatus.FAILED:
      textStatus = 'Thất bại';
      className = 'border-red-400 bg-red-200';
      break;
    default:
      textStatus = 'Thất bại';
      className = 'border-red-400 bg-red-200';
  }
  return (
    <div
      className={`rounded-[1.6rem] border-[1px] bg-opacity-50 px-2 py-[0.2rem] ${className}`}
    >
      {textStatus}
    </div>
  );
}

export default OrderStatusComponent;
