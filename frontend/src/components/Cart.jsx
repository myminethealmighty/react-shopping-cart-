import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearCart,
  decreaseQty,
  getTotal,
  increaseQty,
  removeCart,
} from "../store/slices/cartSlice";
import { LeftArrow, MinusSign, PlusSign, RemoveIcon } from "../utils/SvgItems";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const handleRemoveCart = (cartItem) => {
    dispatch(removeCart(cartItem));
  };

  const handleDecreaseQty = (cartItem) => {
    dispatch(decreaseQty(cartItem));
  };

  const handleIncreaseQty = (cartItem) => {
    dispatch(increaseQty(cartItem));
  };

  const handleRemovedCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>
            Your cart is <strong>Empty!</strong>
          </p>
          <div className="start-shopping">
            <Link to="/">
              <LeftArrow />
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems?.map((cartItem) => (
              <div key={cartItem.id} className="cart-item">
                <div className="cart-product">
                  <img src={cartItem.image} alt={cartItem.name} />
                  <div>
                    <h4>{cartItem.name}</h4>
                    <p>{cartItem.features}</p>
                  </div>
                  <button onClick={() => handleRemoveCart(cartItem)}>
                    <RemoveIcon />
                  </button>
                </div>
                <div className="product-price">${cartItem.price}</div>
                <div className="product-quantity">
                  <button onClick={() => handleDecreaseQty(cartItem)}>
                    <MinusSign />
                  </button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button onClick={() => handleIncreaseQty(cartItem)}>
                    <PlusSign />
                  </button>
                </div>
                <div className="total-price">
                  ${cartItem.price * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="cart-clear" onClick={() => handleRemovedCart()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cart.cartTotalAmount}</span>
              </div>
              <p>Total (incl. VAT)</p>
              <button>Check Out</button>
              <div className="continue-shopping">
                <Link to="/">
                  <LeftArrow />
                  <span>Start Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
