import StarReview from "../../../common/components/StartReview";
import AVATAR_IMG from "../../../assets/test/mini_avatar.png";

const ProductReviewCard = () => {
  return (
    <div className="my-3 border-[1px] p-3">
      <div className="flex">
        <span className="flex-1">
          <img src={AVATAR_IMG} alt="" className="h-[60px]" />
          <h1 className="font-bold">Floyd Miles</h1>
        </span>
        <StarReview rating={4} />
      </div>
      <div>
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint. Velit officia consequat duis enim velit mollit. Exercitation
        veniam consequat sunt nostrud amet. Amet minim mollit non deserunt
        ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
        enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
      </div>
    </div>
  );
};
export default ProductReviewCard;
