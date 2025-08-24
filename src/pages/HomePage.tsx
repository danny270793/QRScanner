import { type FC, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

export const HomePage: FC = (): ReactNode => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          {/* App Icon */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4M4 4h5.01M4 20h5.01M20 4h.01M20 20h.01M12 8h.01M8 12h.01M12 16h.01M16 12h.01"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            QR Scanner
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Scan QR codes instantly with your camera
          </p>

          {/* Main CTA Buttons */}
          <div className="space-y-4 mb-8">
            <Link
              to="/scanner"
              className="inline-block w-full px-8 py-4 text-white text-lg font-semibold rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Start Scanning
            </Link>

            <Link
              to="/generator"
              className="inline-block w-full px-8 py-4 text-white text-lg font-semibold rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Generate QR Code
            </Link>
          </div>

          {/* Features */}
          <div className="grid gap-4 text-left">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Instant Detection
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Quickly scan and decode any QR code with your camera
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Secure & Private
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All scanning happens locally on your device
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Copy & Share
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Easily copy content or open URLs from QR codes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
