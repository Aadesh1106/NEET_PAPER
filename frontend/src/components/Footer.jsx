import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">NEET PYQ Hub</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your ultimate destination for NEET Previous Year Questions,
              Solutions, and Cutoff Analysis. Helping students achieve their
              medical dreams through comprehensive preparation resources.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/archive"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  PYQ Archive
                </a>
              </li>
              <li>
                <a
                  href="/solutions"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Solutions
                </a>
              </li>
              <li>
                <a
                  href="/cutoff-analysis"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Cutoff Analysis
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@neetpyqhub.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                <span>+91 12345 67890</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 NEET PYQ Hub. All rights reserved. Built for NEET aspirants
            with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
