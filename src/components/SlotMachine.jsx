import React, { useState, useEffect } from 'react';

function SlotMachine({ students, secretQueue, setSecretQueue, onBack }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  
  // Create a long list for the slot effect
  const [strip, setStrip] = useState([]);
  const [offset, setOffset] = useState(0);

  const startSpin = () => {
    if (students.length === 0) return;
    
    setIsSpinning(true);
    setWinner(null);
    
    // Create a new random strip for this spin
    const newStrip = [];
    // Repeat students randomly to build a long strip (e.g., 30 items)
    for (let i = 0; i < 30; i++) {
      newStrip.push(students[Math.floor(Math.random() * students.length)]);
    }
    
    // Determine winner
    let selectedWinner;
    if (secretQueue.length > 0) {
      const nextSecret = secretQueue[0];
      if (students.includes(nextSecret)) {
        selectedWinner = nextSecret;
        setSecretQueue(prev => prev.slice(1));
      } else {
        selectedWinner = students[Math.floor(Math.random() * students.length)];
      }
    } else {
      selectedWinner = students[Math.floor(Math.random() * students.length)];
    }
    
    // Put the winner at the end of the strip (e.g., index 28, so it shows correctly)
    newStrip[28] = selectedWinner;
    setStrip(newStrip);
    
    // Reset offset instantly (without transition)
    setOffset(0);

    // Give it a tiny delay to allow CSS to reset, then trigger the spin
    setTimeout(() => {
      // 100px is the height of a single slot-item in our CSS
      // To show index 28, we translate by -2800px.
      setOffset(-2800); 
    }, 50);

    // Stop after the transition duration (3s in our CSS)
    setTimeout(() => {
      setWinner(selectedWinner);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="flex-col gap-4 text-center">
      <h2>🎉 랜덤 발표자 추출 🎉</h2>
      
      <div className="slot-machine-wrapper">
        {/* We add an overlay gradient to make it look round and realistic */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '20px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
          zIndex: 10, pointerEvents: 'none', borderRadius: '16px 16px 0 0'
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '20px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
          zIndex: 10, pointerEvents: 'none', borderRadius: '0 0 16px 16px'
        }} />

        <div className="slot-container">
          <div 
            className="slot-items" 
            style={{ 
              transform: `translateY(${offset}px)`,
              transition: isSpinning ? 'transform 3s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none'
            }}
          >
            {strip.length > 0 ? strip.map((item, idx) => (
              <div key={idx} className={`slot-item ${winner && idx === 28 ? 'winner-highlight' : ''}`}>
                {item}
              </div>
            )) : (
              <div className="slot-item">?</div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-col gap-4 mt-6">
        <button 
          onClick={startSpin} 
          disabled={isSpinning}
          style={{ padding: '1rem', fontSize: '1.2rem' }}
        >
          {isSpinning ? '추출 중...' : '🎰 뽑기!'}
        </button>
        
        <button 
          onClick={onBack} 
          disabled={isSpinning}
          style={{ background: 'transparent', border: '1px solid var(--glass-border)', boxShadow: 'none' }}
        >
          명단 관리로 돌아가기
        </button>
      </div>
      
      {winner && (
        <div className="mt-4 text-accent" style={{ animation: 'fadeIn 0.5s ease' }}>
          <h3>축하합니다! (혹은 수고하세요!)</h3>
        </div>
      )}
    </div>
  );
}

export default SlotMachine;
