import ProductReviewCard from './ProductReviewCard';

const ProductReviewComponent = () => {
  return (
    <span className="overflow-y-scroll">
      <div>
        <ProductReviewCard />
        <ProductReviewCard />
      </div>
      <p className="cursor-pointer select-none text-center text-[#3BB77E]">
        Show more
      </p>
    </span>
  );
};

export default ProductReviewComponent;
