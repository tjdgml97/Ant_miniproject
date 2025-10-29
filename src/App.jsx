import { Routes, Route } from "react-router-dom";
import LandingScreen from "./components/LandingScreen/LandingScreen";
import SignInScreen from "./components/SignInScreen/SignInScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/signin" element={<SignInScreen />} />
    </Routes>
  );
}

export default App;
