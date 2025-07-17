import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route } from "react-router-dom";
// Import Pages
import UserRegistrationPage from "./pages/UserRegister";
import UserLoginPage from "./pages/UserLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/login" element={<UserLoginPage/>} />
      <Route path="/register" element={<UserRegistrationPage/>} />
    </Routes>
  );
}

export default App;
