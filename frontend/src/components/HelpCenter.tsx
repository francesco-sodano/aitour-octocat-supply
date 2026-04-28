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
            Welcome to the OctoCAT Supply Help Center. We're here to assist you with any questions
            or issues you may have about our AI-powered smart cat products.
          </p>
          <h2 className="text-2xl font-bold text-primary">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">How do I set up my smart cat product?</h3>
              <p>
                Each product comes with a detailed setup guide. Simply follow the instructions in
                the box, download our mobile app, and connect your device to Wi-Fi. The app will
                guide you through the rest of the setup process.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What if my cat doesn't use the product?</h3>
              <p>
                Give your cat time to adjust to the new product. Place treats near or on the
                product to encourage exploration. Our AI learns your cat's preferences over time
                and adapts accordingly.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">How do I update my product's firmware?</h3>
              <p>
                Firmware updates are automatically pushed to your device when connected to Wi-Fi.
                You'll receive a notification in the app when an update is available or in progress.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What is your return policy?</h3>
              <p>
                We offer a 30-day satisfaction guarantee. If your cat isn't purring with delight,
                return the product for a full refund. The product must be in its original condition
                with all accessories included.
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-primary">Contact Support</h2>
          <p>
            Can't find what you're looking for? Our support team is here to help!
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Email: support@octocatsupply.com</li>
            <li>Phone: 1-800-MEOW-TECH (1-800-636-9832)</li>
            <li>Live Chat: Available Monday-Friday, 9 AM - 6 PM EST</li>
          </ul>
          <div
            className={`mt-8 p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg transition-colors duration-300`}
          >
            <p className="italic">
              "Your satisfaction is our priority. We're committed to making sure both you and your
              feline friend have the best experience with our products!" — Customer Support Team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
