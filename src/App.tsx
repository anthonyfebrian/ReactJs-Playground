import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import HelloPage from './presentation/page/HelloPage';
import DetailPage from './presentation/page/DetailPage';


function App() {
  return (
    <BrowserRouter>
      <MyRoute />
    </BrowserRouter>
  );
}

function MyRoute() {
  const nav = useNavigate()

  return (
    <Routes>
      <Route path="/" element={
        <HelloPage
          navToDetail={function (id: number): void {
            nav(`/detail/${id}`)
          }}
        />}
      />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/about" element={<h1>about s</h1>} />
      {/* <Route path="/button" element={<MyButton/>} /> */}
      {/* ... other routes */}
    </Routes>
  )
}

export default App
