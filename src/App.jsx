import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPortfolio from './MainPortfolio'; 
import AdminPanel from './components/Admin/AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Portfolio Route */}
        <Route path="/" element={<MainPortfolio />} />
        
        {/* Admin Dashboard Route */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;