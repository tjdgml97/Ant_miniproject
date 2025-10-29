import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingScreen.css";

function LandingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // 3초 후에 SignInScreen으로 전환
    const timer = setTimeout(() => {
      navigate("/signin");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="landing-screen">
      <div className="landing-title">접속 로딩</div>
      <div className="landing-content">
        <div className="ants-container">
          <div className="ant ant-large">🐜</div>
          <div className="ant ant-medium">🐜</div>
          <div className="ant ant-small">🐜</div>
        </div>
      </div>
    </div>
  );
}

export default LandingScreen;
