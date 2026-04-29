import { useTheme } from '../context/ThemeContext';

const HelpCenter = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-dark' : 'bg-gray-100'} p-4 transition-colors duration-300`}
    >
      <div
        className={`max-w-4xl w-full ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} rounded-lg shadow-lg p-8 border ${darkMode ? 'border-primary/20' : 'border-gray-200'} transition-colors duration-300`}
      >
        <h1
          className={`text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}
        >
          Help Center
        </h1>
        <div className="space-y-6">
          <p>
            Welcome to the OctoCAT Supply Help Center. We're here to help you get the most out of
            your AI-powered smart cat products.
          </p>
          <h2 className="text-2xl font-bold text-primary">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">How do I set up my smart cat products?</h3>
              <p className="mt-2">
                Each product comes with a detailed quick start guide. Simply download the OctoCAT
                Supply app, create an account, and follow the in-app setup instructions to connect
                your devices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">What if my cat doesn't use the product?</h3>
              <p className="mt-2">
                Cats can take time to adjust to new items. We recommend placing treats near the
                product and allowing your cat to explore at their own pace. Most cats adapt within
                a week. Check our detailed adjustment guides in the app.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">How do I track my order?</h3>
              <p className="mt-2">
                Once your order ships, you'll receive a tracking number via email. You can also
                view your order status by logging into your account and visiting the Orders
                section.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">What is your return policy?</h3>
              <p className="mt-2">
                We offer a 30-day return policy on all products. If you're not satisfied, contact
                our support team to initiate a return. Products must be in original condition with
                all packaging.
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-primary">Contact Support</h2>
          <p>
            Can't find what you're looking for? Our support team is here to help!
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Email: support@octocatsupply.com</li>
            <li>Phone: 1-800-OCTOCAT (Mon-Fri, 9AM-6PM EST)</li>
            <li>Live Chat: Available in the app 24/7</li>
          </ul>
          <div
            className={`mt-8 p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg transition-colors duration-300`}
          >
            <p className="italic">
              "Our mission is to ensure every cat and their human companion have the best
              experience with our products." — Customer Success Team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
