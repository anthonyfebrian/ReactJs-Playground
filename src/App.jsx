import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TestJsx from './TestJsx';
import HelloPage from './presentation/page/HelloPage';
// import MyButton from './MyButton';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

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
