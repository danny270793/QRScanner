import { type FC, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const HomePage: FC = (): ReactNode => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-pink-50 to-indigo-100 dark:from-gray-800 dark:via-purple-900/20 dark:to-indigo-900/30">
      {/* Modern Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-purple-50/30 dark:bg-purple-900/10"></div>

        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            {/* Modern App Icon with Effects */}
            <div className="relative mx-auto mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
                <div className="w-28 h-28 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-6 h-6 bg-pink-400 rounded-full animate-bounce delay-100"></div>
              <div className="absolute -bottom-2 -left-4 w-4 h-4 bg-indigo-400 rounded-full animate-pulse delay-300"></div>
              <div className="absolute top-1/2 -right-6 w-3 h-3 bg-purple-400 rounded-full animate-ping delay-700"></div>
            </div>

            {/* Enhanced Title */}
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400 bg-clip-text text-transparent mb-6">
              {t('app.title')}
            </h1>
            <p className="text-xl text-purple-700/80 dark:text-purple-300/80 mb-12 font-medium leading-relaxed">
              {t('app.subtitle')}
            </p>

            {/* Modern CTA Buttons */}
            <div className="space-y-6 mb-16">
              <Link
                to="/scanner"
                className="group inline-block w-full px-10 py-5 text-white text-xl font-bold rounded-3xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl hover:shadow-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 shadow-purple-500/25 hover:shadow-purple-500/40"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg
                    className="w-6 h-6 transition-transform group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                  {t('buttons.startScanning')}
                </div>
              </Link>

              <Link
                to="/generator"
                className="group inline-block w-full px-10 py-5 text-white text-xl font-bold rounded-3xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl hover:shadow-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:via-rose-600 hover:to-purple-600 shadow-pink-500/25 hover:shadow-pink-500/40"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg
                    className="w-6 h-6 transition-transform group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  {t('buttons.generateQrCode')}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-md mx-auto">
          <div className="grid gap-6 text-left">
            {/* Feature 1 - Instant Detection */}
            <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl shadow-purple-500/10 border border-purple-100/50 dark:border-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
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
                <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100">
                  {t('features.instantDetection.title')}
                </h3>
              </div>
              <p className="text-purple-700 dark:text-purple-200 leading-relaxed">
                {t('features.instantDetection.description')}
              </p>
            </div>

            {/* Feature 2 - Secure & Private */}
            <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl shadow-purple-500/10 border border-purple-100/50 dark:border-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
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
                <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100">
                  {t('features.securePrivate.title')}
                </h3>
              </div>
              <p className="text-purple-700 dark:text-purple-200 leading-relaxed">
                {t('features.securePrivate.description')}
              </p>
            </div>

            {/* Feature 3 - Copy & Share */}
            <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl shadow-purple-500/10 border border-purple-100/50 dark:border-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
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
                <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100">
                  {t('features.copyShare.title')}
                </h3>
              </div>
              <p className="text-purple-700 dark:text-purple-200 leading-relaxed">
                {t('features.copyShare.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
