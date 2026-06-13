import React, { useState, useEffect } from 'react';
import StudentManager from './components/StudentManager';
import SlotMachine from './components/SlotMachine';
import SecretMenu from './components/SecretMenu';

function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('randomPresenterStudents');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [secretQueue, setSecretQueue] = useState([]);
  const [view, setView] = useState('manager'); // 'manager' | 'slot'
  const [isSecretMenuOpen, setIsSecretMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('randomPresenterStudents', JSON.stringify(students));
  }, [students]);

  // Handle secret shortcut Ctrl+Shift+T
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        setIsSecretMenuOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddStudents = (newStudents) => {
    setStudents((prev) => {
      const combined = [...prev, ...newStudents];
      return [...new Set(combined)]; // Remove duplicates
    });
  };

  const handleRemoveStudent = (student) => {
    setStudents((prev) => prev.filter((s) => s !== student));
    setSecretQueue((prev) => prev.filter((s) => s !== student));
  };

  const handleClearStudents = () => {
    if (confirm('모든 학생 명단을 삭제하시겠습니까?')) {
      setStudents([]);
      setSecretQueue([]);
    }
  };

  return (
    <div className="glass-panel">
      {view === 'manager' ? (
        <StudentManager
          students={students}
          onAdd={handleAddStudents}
          onRemove={handleRemoveStudent}
          onClear={handleClearStudents}
          onStart={() => setView('slot')}
        />
      ) : (
        <SlotMachine
          students={students}
          secretQueue={secretQueue}
          setSecretQueue={setSecretQueue}
          onBack={() => setView('manager')}
        />
      )}

      {isSecretMenuOpen && (
        <SecretMenu
          students={students}
          secretQueue={secretQueue}
          setSecretQueue={setSecretQueue}
          onClose={() => setIsSecretMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
