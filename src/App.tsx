import { type FC, type ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { QRScannerPage } from './pages/QRScannerPage'
import './App.css'

const App: FC = (): ReactNode => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scanner" element={<QRScannerPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
