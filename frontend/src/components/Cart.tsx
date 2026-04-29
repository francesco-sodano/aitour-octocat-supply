import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { calculateDiscountedPrice } from '../utils/price';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1
            className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}
          >
            My Cart
          </h1>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className={`text-sm px-3 py-1 rounded-md border transition-colors ${darkMode ? 'border-gray-600 text-gray-300 hover:text-red-400 hover:border-red-400' : 'border-gray-300 text-gray-600 hover:text-red-500 hover:border-red-500'}`}
            >
              Clear cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center py-20 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            role="status"
          >
            <span className="text-6xl mb-4" aria-hidden="true">🛒</span>
            <p className={`text-xl font-medium ${darkMode ? 'text-light' : 'text-gray-800'}`}>
              Your cart is empty
            </p>
            <Link
              to="/products"
              className="mt-4 bg-primary hover:bg-accent text-white px-5 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div
              className={`rounded-lg overflow-hidden shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              {items.map((item, index) => {
                const unitPrice = calculateDiscountedPrice(item.price, item.discount);
                return (
                  <div
                    key={item.productId}
                    className={`flex items-center gap-4 p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} ${index !== 0 ? `border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}` : ''} transition-colors duration-300`}
                  >
                    <img
                      src={`/${item.imgName}`}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded-md flex-shrink-0"
                    />

                    <div className="flex-grow min-w-0">
                      <p className={`font-medium truncate ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                        {item.name}
                      </p>
                      <p className="text-primary font-semibold">
                        ${unitPrice.toFixed(2)}{' '}
                        <span className={`text-xs font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          each
                        </span>
                      </p>
                    </div>

                    <div
                      className={`flex items-center space-x-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-1`}
                    >
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className={`w-7 h-7 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors`}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <span aria-hidden="true">−</span>
                      </button>
                      <span
                        className={`min-w-[1.5rem] text-center text-sm ${darkMode ? 'text-light' : 'text-gray-800'}`}
                        aria-label={`Quantity of ${item.name}`}
                        aria-live="polite"
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className={`w-7 h-7 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors`}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <span aria-hidden="true">+</span>
                      </button>
                    </div>

                    <p
                      className={`w-20 text-right font-semibold ${darkMode ? 'text-light' : 'text-gray-800'}`}
                      aria-label={`Subtotal for ${item.name}`}
                    >
                      ${(unitPrice * item.quantity).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className={`flex-shrink-0 p-1 rounded-full ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'} transition-colors`}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>

            <div
              className={`rounded-lg p-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow-sm transition-colors duration-300`}
            >
              <div className={`flex justify-between text-lg font-bold ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                <span>Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                className="mt-4 w-full bg-gray-300 text-gray-500 py-2 rounded-md font-medium cursor-not-allowed"
                disabled
                title="Checkout is not yet implemented"
              >
                Proceed to Checkout (Coming Soon)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
