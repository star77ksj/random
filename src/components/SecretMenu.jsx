import React, { useState } from 'react';

function SecretMenu({ students, secretQueue, setSecretQueue, onClose }) {
  const [selectedStudent, setSelectedStudent] = useState('');

  const handleQueue = () => {
    if (selectedStudent && !secretQueue.includes(selectedStudent)) {
      setSecretQueue(prev => [...prev, selectedStudent]);
      setSelectedStudent('');
    }
  };

  const handleRemoveQueue = (student) => {
    setSecretQueue(prev => prev.filter(s => s !== student));
  };

  return (
    <div className="secret-menu">
      <div className="flex justify-between items-center mb-6">
        <h2 style={{ margin: 0, textAlign: 'left' }}>선생님 모드 (조작)</h2>
        <button onClick={onClose} style={{ background: 'transparent', color: 'white', boxShadow: 'none' }}>✕ 닫기</button>
      </div>

      <div className="flex-col gap-4">
        <div className="flex-col gap-2">
          <label className="text-gray text-sm">다음에 당첨될 학생 선택</label>
          <div className="flex gap-2">
            <select 
              value={selectedStudent} 
              onChange={(e) => setSelectedStudent(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid var(--glass-border)',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '12px',
                fontFamily: 'inherit'
              }}
            >
              <option value="">-- 학생 선택 --</option>
              {students.map((s, idx) => (
                <option key={idx} value={s}>{s}</option>
              ))}
            </select>
            <button onClick={handleQueue}>예약</button>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-sm text-gray" style={{ textAlign: 'left' }}>당첨 대기열 (순서대로 당첨됨)</h3>
          {secretQueue.length === 0 ? (
            <p className="text-sm">현재 예약된 학생이 없습니다.</p>
          ) : (
            <div className="flex-col gap-2 mt-2">
              {secretQueue.map((s, idx) => (
                <div key={idx} className="flex justify-between items-center p-2" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                  <span>{idx + 1}. {s}</span>
                  <button className="danger text-sm" style={{ padding: '0.25rem 0.5rem' }} onClick={() => handleRemoveQueue(s)}>취소</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-auto pt-6 text-center text-sm text-gray">
        <p>이 메뉴는 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd> 로 열고 닫을 수 있습니다.</p>
      </div>
    </div>
  );
}

export default SecretMenu;
