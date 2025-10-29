import { useState } from "react";
import "./NumberCheck.css";

function NumberCheck() {
  const [phoneNumber, setPhoneNumber] = useState("010");
  const [showError, setShowError] = useState(true);

  // 숫자만 추출하는 함수
  const extractNumbers = (value) => {
    return value.replace(/[^0-9]/g, "");
  };

  // 전화번호 포맷팅 함수 (010/1234-5678 형식**)
  const formatPhoneNumber = (value) => {
    const numbers = extractNumbers(value);
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
        7,
        11
      )}`;
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    // 기본값 "010" 유지
    if (value === "") {
      setPhoneNumber("010");
      setShowError(true);
      return;
    }

    // 숫자만 추출
    const numbers = extractNumbers(value);

    // "010"으로 시작하지 않으면 강제로 "010"으로 설정
    if (numbers.length > 0 && !numbers.startsWith("010")) {
      value = "010" + numbers.replace(/^010/, "");
    }

    // 포맷팅 적용
    const formatted = formatPhoneNumber(value);
    setPhoneNumber(formatted);

    // 유효성 검사 (010 + 8자리 숫자 = 총 11자리 숫자)
    const isValid = extractNumbers(formatted).length === 11;
    setShowError(!isValid && formatted.length > 3);
  };

  const handleVerifyRequest = () => {
    // 인증 요청 로직 (실제 구현에서는 API 호출)
    alert("인증 요청이 전송되었습니다.");
  };

  const handleNext = () => {
    // 다음 버튼 클릭 로직
    const numbers = extractNumbers(phoneNumber);
    const isValid = numbers.length === 11 && numbers.startsWith("010");
    if (!isValid) {
      setShowError(true);
    } else {
      // 유효한 전화번호일 경우 다음 페이지로 이동
      console.log("다음 단계로 이동");
    }
  };

  return (
    <div className="number-check">
      {/* 상단: 제목 및 설명 */}
      <div className="number-header">
        <div className="number-title-container">
          <h1 className="number-title">
            전화번호를 인증해 주세요 <span className="ant-icon">🐜</span>
          </h1>
          <p className="number-description">
            1회 인증하면 Ant의 다양한 도전을 확인할 수 있어요
          </p>
        </div>
      </div>

      {/* 중앙: 전화번호 입력 필드 */}
      <div className="number-content">
        <div className="phone-input-wrapper">
          <div className={`phone-input-container ${showError ? "error" : ""}`}>
            <input
              type="text"
              className="phone-input"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="010"
              maxLength="13"
            />
            <button
              className="verify-request-button"
              onClick={handleVerifyRequest}
            >
              인증 요청
            </button>
          </div>
          {showError && phoneNumber.length > 0 && (
            <p className="error-message">올바른 전화번호를 입력해주세요</p>
          )}
        </div>
      </div>

      {/* 하단: 다음 버튼 */}
      <div className="number-footer">
        <button className="number-button" onClick={handleNext}>
          다음
        </button>
      </div>
    </div>
  );
}

export default NumberCheck;
