import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaSnapchat } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12" data-aos="fade">
      {/* Footer top */}
      <div className="footer-top">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <div>
              {/* Brand */}
              <div className="footer-widget">
                <a href="./index.html" className="brand-img">
                  <img
                    className="me-4 w-32"
                    src="./assets/img/logos/footer-logo.png"
                    srcSet="./assets/img/logos/footer-logo@2x.png 2x"
                    alt="Footer logo"
                  />
                </a>
                <p className="brand-desc mt-4">
                  <em>
                    Moliva Travel Agency offers unique and memorable tours, providing rich experiences in the beautiful
                    country of Moliva.
                  </em>
                  <a href="./about.html" className="text-blue-400">[+]</a>
                </p>
                <ul className="flex space-x-4 mt-4">
                  <li>
                    <a href="#" className="text-blue-500 hover:text-blue-600">
                      <FaFacebook size={20} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-pink-600 hover:text-pink-700">
                      <FaInstagram size={20} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-red-500 hover:text-red-600">
                      <FaYoutube size={20} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-400 hover:text-blue-500">
                      <FaTwitter size={20} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-yellow-500 hover:text-yellow-600">
                      <FaSnapchat size={20} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              {/* Contact Info */}
              <div className="footer-widget">
                <h2 className="text-lg font-semibold mb-3">Contact Info</h2>
                <div className="contact-info">
                  <p>No 234, Placer Loquen Marsei Niriva, Moliva.</p>
                  <p>+33 321-654-987 (Ext: 123).</p>
                  <p>
                    <a href="mailto:Booking@example.com" className="text-blue-400">Booking@example.com</a>
                  </p>
                  <p>
                    <a href="https://www.example.com" className="text-blue-400">www.example.com</a>
                  </p>
                </div>
              </div>
            </div>

            <div>
              {/* Quick Links */}
              <div className="footer-widget">
                <h2 className="text-lg font-semibold mb-3">Moliva Travel</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="./about.html" className="hover:text-gray-400">About us</a>
                  </li>
                  <li>
                    <a href="./destinations-1.html" className="hover:text-gray-400">Destinations</a>
                  </li>
                  <li>
                    <a href="./tour-packages-1.html" className="hover:text-gray-400">Moliva Tours</a>
                  </li>
                  <li>
                    <a href="./post-list.html" className="hover:text-gray-400">Travel insight</a>
                  </li>
                  <li>
                    <a href="./contact.html" className="hover:text-gray-400">Contact us</a>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="footer-widget">
                <h2 className="text-lg font-semibold mb-3">Get the app</h2>
                {/* Mobile App */}
                <div className="mb-5 pt-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <a href="#">
                        <img src="./assets/img/icons/i1.svg" className="w-full" alt="App Store" />
                      </a>
                    </div>
                    <div>
                      <a href="#">
                        <img src="./assets/img/icons/i2.svg" className="w-full" alt="Play Store" />
                      </a>
                    </div>
                  </div>
                </div>
                {/* Language & Currency */}
                <div className="flex space-x-4 items-center">
                  <a data-bs-toggle="modal" href="#mdlLanguage" className="flex items-center">
                    <img src="./assets/img/flags/en.svg" className="w-5 h-5 mr-2" alt="English" />
                    <span>English</span>
                  </a>
                  <a data-bs-toggle="modal" href="#mdlCurrency" className="flex items-center">
                    <span>USD (US Dollar)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom mt-8 border-t border-gray-700 pt-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between text-gray-500">
            <p>© 2024 Moliva Travel Agency. All rights reserved.</p>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-gray-300">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">Terms of Use</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
