import "./NumberCheck.css";

function NumberCheck() {
  return (
    <div className="number-check">
      <div className="number-header">
        <h1 className="number-title">개인정보처리방침</h1>
      </div>
      <div className="number-content">
        <div className="number-text-container">
          <p className="number-text">전화번호를 입력해주세요.</p>
        </div>
      </div>
      <div className="number-input-container">
        <input type="text" placeholder="전화번호를 입력해주세요." />
      </div>
    </div>
  );
}

export default NumberCheck;
