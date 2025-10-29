import { useState } from "react";
import "./TermsModal.css";

function TermsModal({ isOpen, onClose, onComplete }) {
  const [agreements, setAgreements] = useState({
    service: false,
    privacy: false,
    community: false,
    age: false,
    marketing: false,
  });

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
    onComplete(agreements);
  };

  const allRequiredChecked =
    agreements.service &&
    agreements.privacy &&
    agreements.community &&
    agreements.age;

  if (!isOpen) return null;

  return (
    <div className="terms-modal-overlay" onClick={onClose}>
      <div
        className={`terms-modal ${isOpen ? "slide-up" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="terms-modal-close" onClick={onClose}>
          ✕
        </button>
        <h2 className="terms-modal-title">
          Ant 를 시작하기 위해 약관에 동의해 주세요
        </h2>

        <div className="terms-list">
          <div className="term-item">
            <button
              className={`term-checkbox ${agreements.service ? "checked" : ""}`}
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
              className={`term-checkbox ${agreements.privacy ? "checked" : ""}`}
              onClick={() => handleAgreementChange("privacy")}
            >
              {agreements.privacy && "✓"}
            </button>
            <span className="term-text">
              개인정보 수집 및 이용 등 <span className="required">(필수)</span>
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
  );
}

export default TermsModal;
