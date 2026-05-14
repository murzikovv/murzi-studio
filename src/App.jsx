import { Routes, Route } from 'react-router-dom';
import { useLenis } from './lib/useLenis.js';
import Cursor from './components/Cursor.jsx';
import MainPage from './pages/MainPage.jsx';
import Brief from './pages/Brief.jsx';

export default function App() {
  useLenis();
  return (
    <div className="grain min-h-screen">
      <Cursor />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/brief" element={<Brief />} />
      </Routes>
    </div>
  );
}
