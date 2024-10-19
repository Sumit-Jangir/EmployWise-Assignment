import Items from './components/Items';
import {Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login'
import './index.css';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/data" element={<Items />} />
        <Route path="/items" element={<Items />} />
        {/* <Route path="/users/edit/:id" element={<EditUser />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
