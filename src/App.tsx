import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { ConverterPage } from './pages/ConverterPage';
import { RatesPage } from './pages/RatesPage';

export default function App() {
  return (
    <div className="app">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<ConverterPage />} />
          <Route path="/rates" element={<RatesPage />} />
        </Routes>
      </main>
    </div>
  );
}