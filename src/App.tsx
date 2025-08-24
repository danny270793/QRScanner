import { type FC, type ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { QRScannerPage } from './pages/QRScannerPage'
import { QRGeneratorPage } from './pages/QRGeneratorPage'

const App: FC = (): ReactNode => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scanner" element={<QRScannerPage />} />
        <Route path="/generator" element={<QRGeneratorPage />} />
      </Routes>
    </Router>
  )
}

export default App
