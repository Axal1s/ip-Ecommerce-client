const ProductCard = ({ product, onButtonClick }) => {
  return (
    <>
      <div className="card w-80 bg-base-100 shadow-xl">
        <figure>
          <img src={product.imageUrl} alt="" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.title}</h2>
          <p>{product.description}</p>
          <p className="font-semibold">Stock: {product.stock}</p>
          <div className="card-actions flex flex-col items-end">
            <p className="font-bold">Rp. {product.price}</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                onButtonClick(product.id);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
