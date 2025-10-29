import { useState, useRef, useEffect } from "react";
import "./NumberCheck.css";

function NumberCheck() {
  const [phoneNumber, setPhoneNumber] = useState("010");
  const [showError, setShowError] = useState(true);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreements, setAgreements] = useState({
    service: false,
    privacy: false,
    community: false,
    age: false,
    marketing: false,
  });
  const modalJustOpenedRef = useRef(false);

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

  // 전화번호 유효성 검사 (11자리 숫자)
  const isValidPhoneNumber = (phoneNumber) => {
    const numbers = extractNumbers(phoneNumber);
    return numbers.length === 11 && numbers.startsWith("010");
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

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // 다음 버튼 클릭 시 약관 동의 모달 표시
    const numbers = extractNumbers(phoneNumber);
    const isValid = numbers.length === 11 && numbers.startsWith("010");
    if (!isValid) {
      setShowError(true);
    } else {
      // 모달 열기
      setShowTermsModal(true);
      modalJustOpenedRef.current = true;
      // 모달이 열린 직후 200ms 동안 클릭 무시
      setTimeout(() => {
        modalJustOpenedRef.current = false;
      }, 200);
    }
  };

  useEffect(() => {
    if (showTermsModal) {
      modalJustOpenedRef.current = true;
      const timer = setTimeout(() => {
        modalJustOpenedRef.current = false;
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [showTermsModal]);

  const handleAgreementChange = (key) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAgreeAll = () => {
    const allChecked = Object.values(agreements).every((v) => v);
    setAgreements({
      service: !allChecked,
      privacy: !allChecked,
      community: !allChecked,
      age: !allChecked,
      marketing: !allChecked,
    });
  };

  const handleCompleteSignup = () => {
    // 필수 항목 체크
    const requiredChecked =
      agreements.service &&
      agreements.privacy &&
      agreements.community &&
      agreements.age;

    if (!requiredChecked) {
      alert("필수 약관에 모두 동의해주세요.");
      return;
    }

    // 가입 완료 처리
    console.log("가입 완료", agreements);
    setShowTermsModal(false);
    // 다음 페이지로 이동하는 로직 추가
  };

  const handleOverlayClick = (e) => {
    // 모달이 방금 열렸으면 클릭 무시
    if (modalJustOpenedRef.current) {
      return;
    }
    // 오버레이 클릭 시에만 닫기
    if (e.target === e.currentTarget) {
      setShowTermsModal(false);
    }
  };

  const allRequiredChecked =
    agreements.service &&
    agreements.privacy &&
    agreements.community &&
    agreements.age;

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
        <button
          className="number-button"
          onClick={handleNext}
          disabled={!isValidPhoneNumber(phoneNumber)}
        >
          다음
        </button>
      </div>

      {/* 약관 동의 바텀시트 */}
      {showTermsModal && (
        <div
          className="terms-bottom-sheet-overlay"
          onClick={handleOverlayClick}
          onMouseDown={(e) => {
            if (modalJustOpenedRef.current && e.target === e.currentTarget) {
              e.preventDefault();
            }
          }}
        >
          <div
            className="terms-bottom-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 바텀시트 핸들 */}
            <div className="bottom-sheet-handle">
              <div className="handle-bar"></div>
            </div>
            <h2 className="terms-bottom-sheet-title">
              Ant 를 시작하기 위해 약관에 동의해 주세요
            </h2>

            <div className="terms-list">
              <div className="term-item">
                <button
                  className={`term-checkbox ${
                    agreements.service ? "checked" : ""
                  }`}
                  onClick={() => handleAgreementChange("service")}
                >
                  {agreements.service && "✓"}
                </button>
                <span className="term-text">
                  서비스 이용약관 동의 <span className="required">(필수)</span>
                </span>
              </div>

              <div className="term-item">
                <button
                  className={`term-checkbox ${
                    agreements.privacy ? "checked" : ""
                  }`}
                  onClick={() => handleAgreementChange("privacy")}
                >
                  {agreements.privacy && "✓"}
                </button>
                <span className="term-text">
                  개인정보 수집 및 이용 등{" "}
                  <span className="required">(필수)</span>
                </span>
              </div>

              <div className="term-item">
                <button
                  className={`term-checkbox ${
                    agreements.community ? "checked" : ""
                  }`}
                  onClick={() => handleAgreementChange("community")}
                >
                  {agreements.community && "✓"}
                </button>
                <span className="term-text">
                  커뮤니티 가이드 동의 <span className="required">(필수)</span>
                </span>
              </div>

              <div className="term-item">
                <button
                  className={`term-checkbox ${agreements.age ? "checked" : ""}`}
                  onClick={() => handleAgreementChange("age")}
                >
                  {agreements.age && "✓"}
                </button>
                <span className="term-text">
                  만 19세 이상 <span className="required">(필수)</span>
                </span>
              </div>

              <div className="term-item">
                <button
                  className={`term-checkbox ${
                    agreements.marketing ? "checked" : ""
                  }`}
                  onClick={() => handleAgreementChange("marketing")}
                >
                  {agreements.marketing && "✓"}
                </button>
                <div className="term-text-container">
                  <span className="term-text">
                    혜택 및 이벤트 알림 수신 동의{" "}
                    <span className="optional">(선택)</span>
                  </span>
                  <p className="term-description">
                    수신 동의를 하지 않으면 맞춤형 추천 모집, 이벤트 소식 및
                    회원님을 위한 특별한 혜택 정보를 받을 수 없어요
                  </p>
                </div>
              </div>
            </div>

            <button className="terms-button agree-all" onClick={handleAgreeAll}>
              모두 동의합니다
            </button>

            <button
              className="terms-button complete-signup"
              onClick={handleCompleteSignup}
              disabled={!allRequiredChecked}
            >
              가입 완료하고 시작하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NumberCheck;
