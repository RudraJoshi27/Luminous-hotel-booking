import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import ListHotel from './pages/ListHotel';
import HotelDetail from './pages/HotelDetail';
import MyBookings from './pages/MyBookings';
import AdminUsers from './pages/AdminUsers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/list-hotel" element={<ListHotel />} />
        <Route path="/hotel/:id" element={<HotelDetail />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
