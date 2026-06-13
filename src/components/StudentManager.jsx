import React, { useState } from 'react';

function StudentManager({ students, onAdd, onRemove, onClear, onStart }) {
  const [inputText, setInputText] = useState('');

  const handleAdd = () => {
    if (!inputText.trim()) return;
    
    // Split by comma, newline, or space, then filter empty
    const newStudents = inputText
      .split(/[\n, ]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
      
    if (newStudents.length > 0) {
      onAdd(newStudents);
      setInputText('');
    }
  };

  return (
    <div className="flex-col gap-4">
      <h2>발표자 명단 관리</h2>
      
      <div className="flex-col gap-2 mt-4">
        <label className="text-sm text-gray">학생 이름 입력 (쉼표, 띄어쓰기, 줄바꿈으로 여러 명 일괄 추가 가능)</label>
        <textarea 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="예: 홍길동, 김철수, 이영희..."
        />
        <button onClick={handleAdd}>명단 추가하기</button>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm text-gray">현재 명단 (총 {students.length}명)</label>
          {students.length > 0 && (
            <button className="danger text-sm" style={{ padding: '0.25rem 0.5rem' }} onClick={onClear}>전체 삭제</button>
          )}
        </div>
        
        <div className="student-list">
          {students.length === 0 ? (
            <p className="text-gray text-center w-full text-sm my-4">등록된 학생이 없습니다.</p>
          ) : (
            students.map((student, idx) => (
              <span key={idx} className="student-tag">
                {student}
                <button onClick={() => onRemove(student)}>✕</button>
              </span>
            ))
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button 
          onClick={onStart} 
          disabled={students.length < 2}
          style={{ width: '100%', padding: '1rem', fontSize: '1.2rem' }}
        >
          🎲 랜덤 추출 시작하기
        </button>
      </div>
    </div>
  );
}

export default StudentManager;
