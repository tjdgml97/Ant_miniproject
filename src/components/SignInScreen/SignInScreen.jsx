import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInScreen.css";

// 1. 상태관리
function SignInScreen() {
  const [showPopup, setShowPopup] = useState(false); //false 가 초기값 , setShowPopup이 실행될떄마다 shopopup 의 값이 변경 = 상태변경함수, 즉 상태가 변경되면 해당 컴포넌트가 자동 리렌더링된다
  //즉, useState + 조건부 렌더링 구조에서 리렌더링은 상태 변화에 따라 UI를 즉시 업데이트하기 위해 필수
  const navigate = useNavigate();

  const handleLogin = () => {
    // 팝업을 표시
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    // 팝업을 숨기고 다음 페이지로 이동
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
      {/* <button /> */}
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
      {/* 삼항 연산자 사용하기 */}
      {/* 조건 ? 참일_때_값 : 거짓일_때_값 */}
      {/* if showPopup === true ? 이 코드가 실행되라!@  */}
      {/* {showPopup ? (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-message">로그인이 완료되었습니다</div>
            <button className="popup-close-button" onClick={handleClosePopup}>
              닫기
            </button>
          </div>
        </div>
      ) : null} */}
      {/* shoPopup = true 일경우 실행되는 코드  */}
      {/* 팝업처럼 css 로 구성  */}
      {/* 2.조건부 렌더링 */}
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
