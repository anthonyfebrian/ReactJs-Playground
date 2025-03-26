import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HelloPage from './presentation/page/HelloPage';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<HelloPage />} />
        <Route path="/about" element={<h1>about s</h1>} />
        {/* <Route path="/button" element={<MyButton/>} /> */}
        {/* ... other routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
