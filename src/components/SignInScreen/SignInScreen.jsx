import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInScreen.css";

function SignInScreen() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/Number");
  };

  return (
    <div className="signin-screen">
      {/* 상단: Ant 로고 */}
      <div className="signin-header">
        <h1 className="signin-title">
          Ant <span className="ant-icon">🐜</span>
        </h1>
      </div>

      {/* 중앙: 텍스트 */}
      <div className="signin-content">
        <div className="signin-text-container">
          <p className="signin-text-main">"작지만 지혜롭게</p>
          <p className="signin-text-sub">함께 준비하는 우리"</p>
        </div>
      </div>

      {/* 하단: 소셜 로그인 버튼 */}
      <div className="signin-footer">
        <button
          className="signin-button signin-button-kakao"
          onClick={handleLogin}
        >
          카카오톡으로 시작하기
        </button>
        <button
          className="signin-button signin-button-google"
          onClick={handleLogin}
        >
          구글로 시작하기
        </button>
      </div>

      {/* 팝업 */}
      {showPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-message">로그인이 완료되었습니다</div>
            <button className="popup-close-button" onClick={handleClosePopup}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignInScreen;
