import React, { useState } from 'react';
import './App.css';
import SubjectList from './components/SubjectList';

function App() {
  const [subject, setSubject] = useState();
  const subjects = [
    { _id: 0, name: 'Javascript' },
    { _id: 1, name: 'React' },
  ];
  const handleSubjectSelect = (id) => setSubject(subjects.find(({ _id }) => id === _id));

  return (
    <div className="todo-app">
      {!subject && <SubjectList subjects={subjects} onSubjectSelect={handleSubjectSelect} />}
      {subject && <h1>{subject.name}</h1>}
    </div>
  );
}

export default App;
