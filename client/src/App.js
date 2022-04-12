import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth';

import HomePage from './components/HomePage/HomePage';
import Cart from './components/cart/Cart';
import AddItem from './components/AdminRoles/AddItem';
import ItemPreview from './components/HomePage/ItemPreview';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile/Profile';
import ScrollToTop from './components/ScrollToTop';



function App() {


 
  return (
    <>
   
    <Router>
      <div>
        <div style={{ height: '0px',visibility:'hidden' }}><Auth /></div>
        <Navbar />
        <ScrollToTop />
        <Routes >
          <Route exact path="/" element={<HomePage />} />

          <Route path="/login" element={<Auth />} />
          <Route path="/cart" element={<Cart  />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/AddItem" element={<AddItem />} />
          <Route path="/ItemPreview/:id" element={<ItemPreview />} />
        </Routes >
      </div>
      <Footer />
    </Router>
    </>


  );
}

export default App;
