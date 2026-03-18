import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import OrderPickup from './pages/OrderPickup';
import Tracking from './pages/Tracking';
import Dashboard from './pages/Dashboard';
import AiAssistant from './pages/AiAssistant';
import { initLocalStorage } from './utils/localStorage';

function App() {
  React.useEffect(() => {
    initLocalStorage();
  }, []);

  return (
    <Router>
      <div className="flex-col min-h-screen">
        <Navbar />
        <main style={{ flex: 1, paddingTop: '80px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pickup" element={<OrderPickup />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ai-assistant" element={<AiAssistant />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
