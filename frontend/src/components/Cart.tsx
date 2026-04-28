import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const SHIPPING_COST = 10;
const DISCOUNT_RATE = 0.05;

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [pendingQuantities, setPendingQuantities] = useState<Record<number, string>>({});

  const getDisplayQuantity = (productId: number, currentQty: number): string =>
    pendingQuantities[productId] ?? String(currentQty);

  const handleQuantityChange = (productId: number, raw: string) => {
    setPendingQuantities((prev) => ({ ...prev, [productId]: raw }));
  };

  const handleUpdateCart = () => {
    Object.entries(pendingQuantities).forEach(([id, raw]) => {
      const qty = parseInt(raw, 10);
      if (!isNaN(qty) && qty > 0) {
        updateQuantity(Number(id), qty);
      }
    });
    setPendingQuantities({});
  };

  const handleApplyCoupon = () => {
    // Coupon functionality placeholder
    alert(`Coupon "${couponCode}" applied!`);
  };

  const subtotal = cartItems.reduce((sum, { product, quantity }) => {
    const effectivePrice =
      product.discount != null && product.discount > 0
        ? product.price * (1 - product.discount)
        : product.price;
    return sum + effectivePrice * quantity;
  }, 0);

  const discount = subtotal * DISCOUNT_RATE;
  const grandTotal = subtotal - discount + SHIPPING_COST;

  const rowBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textMain = darkMode ? 'text-light' : 'text-gray-800';
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-gray-700 text-light border-gray-600' : 'bg-white text-gray-800 border-gray-300';

  if (cartItems.length === 0) {
    return (
      <div
        className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-24 pb-16 px-4 transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-24">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-16 w-16 mb-6 ${textMuted}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className={`text-2xl font-bold ${textMain} mb-4`}>Your cart is empty</h2>
          <p className={`${textMuted} mb-8`}>Add some products to get started.</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-md font-medium transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-24 pb-16 px-4 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold ${textMain} mb-8 transition-colors duration-300`}>
          Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Table */}
          <div className="flex-1">
            <div className={`${rowBg} rounded-lg shadow-md overflow-hidden`}>
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${borderColor}`}>
                    {['S. No.', 'Product Image', 'Product Name', 'Unit Price', 'Quantity', 'Total', 'Remove'].map(
                      (heading) => (
                        <th
                          key={heading}
                          className={`px-4 py-3 text-center text-sm font-semibold ${textMain}`}
                        >
                          {heading}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(({ product, quantity }, index) => {
                    const effectivePrice =
                      product.discount != null && product.discount > 0
                        ? product.price * (1 - product.discount)
                        : product.price;
                    const rowTotal = effectivePrice * (parseInt(getDisplayQuantity(product.productId, quantity), 10) || quantity);

                    return (
                      <tr
                        key={product.productId}
                        className={`border-b ${borderColor} last:border-0`}
                      >
                        <td className={`px-4 py-4 text-center ${textMain}`}>{index + 1}</td>
                        <td className="px-4 py-4">
                          <div className="flex justify-center">
                            <img
                              src={`/${product.imgName}`}
                              alt={product.name}
                              className="h-16 w-16 object-contain"
                            />
                          </div>
                        </td>
                        <td className={`px-4 py-4 text-center font-medium ${textMain}`}>
                          {product.name}
                        </td>
                        <td className={`px-4 py-4 text-center ${textMain}`}>
                          ${effectivePrice.toFixed(2)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex justify-center">
                            <input
                              type="number"
                              min={1}
                              value={getDisplayQuantity(product.productId, quantity)}
                              onChange={(e) =>
                                handleQuantityChange(product.productId, e.target.value)
                              }
                              className={`w-16 text-center rounded-md border px-2 py-1 ${inputBg} focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none`}
                              aria-label={`Quantity for ${product.name}`}
                            />
                          </div>
                        </td>
                        <td className={`px-4 py-4 text-center font-semibold ${textMain}`}>
                          ${rowTotal.toFixed(2)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex justify-center">
                            <button
                              onClick={() => removeFromCart(product.productId)}
                              className={`${textMuted} hover:text-red-500 transition-colors`}
                              aria-label={`Remove ${product.name} from cart`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Coupon + Update Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6">
              <div className="flex flex-1 gap-2">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className={`flex-1 px-4 py-2 rounded-lg border ${inputBg} focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none`}
                  aria-label="Coupon code"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={!couponCode.trim()}
                  className="bg-primary hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg font-medium transition-colors"
                >
                  Apply Coupon
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleUpdateCart}
                  className="bg-primary hover:bg-accent text-white px-5 py-2 rounded-lg font-medium transition-colors"
                >
                  Update Cart
                </button>
                <button
                  onClick={clearCart}
                  className={`border ${borderColor} ${textMuted} hover:text-red-500 hover:border-red-400 px-4 py-2 rounded-lg font-medium transition-colors`}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 shrink-0">
            <div className={`${rowBg} rounded-lg shadow-md p-6`}>
              <h2 className={`text-xl font-bold ${textMain} mb-6 text-center`}>Order Summary</h2>
              <div className="space-y-4">
                <div className={`flex justify-between ${textMain}`}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={`flex justify-between ${textMuted}`}>
                  <span>Discount ({Math.round(DISCOUNT_RATE * 100)}%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
                <div className={`flex justify-between ${textMain}`}>
                  <span>Shipping</span>
                  <span>${SHIPPING_COST.toFixed(2)}</span>
                </div>
                <div className={`border-t ${borderColor} pt-4 flex justify-between font-bold ${textMain}`}>
                  <span>Grand Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                className="mt-6 w-full bg-primary hover:bg-accent text-white py-3 rounded-lg font-semibold transition-colors"
                onClick={() => alert('Checkout functionality coming soon!')}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
