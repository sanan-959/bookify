import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route } from "react-router-dom";

// Import Components
import CustomNavbar from "./components/Navbar";

// Import Pages
import UserRegistrationPage from "./pages/UserRegister";
import UserLoginPage from "./pages/UserLogin";
import ListingPage from "./pages/ListingPage";

function App() {
  return (
    <div className="container-fluid bg-secondary">
      <CustomNavbar/>
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/book/listing" element={<ListingPage/>} />
      <Route path="/login" element={<UserLoginPage/>} />
      <Route path="/register" element={<UserRegistrationPage/>} />
    </Routes>
    </div>
  );
}

export default App;
