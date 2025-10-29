import { Routes, Route } from "react-router-dom";
import LandingScreen from "./components/LandingScreen/LandingScreen";
import SignInScreen from "./components/SignInScreen/SignInScreen";
import NumberCheck from "./components/NumberCheck/NumberCheck";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/signin" element={<SignInScreen />} />
      <Route path="/Number" element={<NumberCheck />} />
    </Routes>
  );
}

export default App;
