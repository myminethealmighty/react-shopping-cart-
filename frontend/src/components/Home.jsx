import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../store/slices/cartSlice";
import { useGetAllProductsQuery } from "../store/slices/productApi";

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading....</p>
      ) : error ? (
        <p>Error!</p>
      ) : (
        <>
          <h2>New Arrival</h2>
          <div className="products">
            {data?.map((product) => (
              <div key={product.id} className="product">
                <h3>{product.name}</h3>
                <img src={product.image} alt={product.name} />

                <div className="details">
                  <span>{product.features}</span>
                  <span className="price">${product.price}</span>
                </div>
                <button onClick={() => handleAddCart(product)}>
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Home;
