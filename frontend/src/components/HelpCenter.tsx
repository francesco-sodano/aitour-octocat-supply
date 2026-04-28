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
            Welcome to the OctoCAT Supply Help Center! We're here to assist you with any questions
            or concerns you may have about our AI-powered smart products for cats.
          </p>
          <h2 className="text-2xl font-bold text-primary">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">How do I set up my new smart product?</h3>
              <p>
                Each product comes with a quick-start guide. Simply download our mobile app, follow
                the in-app setup wizard, and connect your device to your Wi-Fi network. Most
                products are ready to use in under 5 minutes!
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What if my cat doesn't like the product?</h3>
              <p>
                We offer a 30-day satisfaction guarantee. If your feline friend isn't purring with
                delight, contact us for a full refund or exchange. We also provide tips on our blog
                to help introduce new products to your cat.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">How do I update my product's firmware?</h3>
              <p>
                Firmware updates are automatic when your device is connected to Wi-Fi. You'll
                receive a notification in the app when an update is available, and it will install
                during your cat's next inactive period to avoid disruption.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                What should I do if my product isn't working?
              </h3>
              <p>
                First, try restarting the device by unplugging it for 30 seconds. Check that it's
                connected to Wi-Fi and the app shows it as online. If issues persist, visit our
                troubleshooting section or contact our support team.
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-primary">Contact Support</h2>
          <p>
            Can't find what you're looking for? Our support team is here to help:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Email: support@octocatsupply.com</li>
            <li>Phone: 1-800-MEOW-TECH (1-800-636-9832)</li>
            <li>Live Chat: Available 24/7 through our mobile app</li>
            <li>Response time: Usually within 4 hours</li>
          </ul>
          <div
            className={`mt-8 p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg transition-colors duration-300`}
          >
            <p className="italic">
              "Our customers' satisfaction is our top priority. We're committed to ensuring both you
              and your cat have the best experience with our products." — Support Team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
