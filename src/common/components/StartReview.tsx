import { FaStar } from 'react-icons/fa';
interface StarReviewProps {
  rating: number;
  size?: number;
  color?: string;
}
const StarReview = ({
  rating,
  size = 20,
  color = '#FFB21D',
}: StarReviewProps) => {
  const star = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      star.push(
        <FaStar color={color ?? '#FFB21D'} size={size ?? 20} key={i}></FaStar>,
      );
    } else {
      star.push(<FaStar color={'#B6B6B6'} size={size ?? 20} key={i}></FaStar>);
    }
  }
  return <div className='flex'>{star}</div>;
};

export default StarReview;
