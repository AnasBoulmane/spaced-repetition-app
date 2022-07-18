import React, { useState } from 'react';
import useAsyncEffect from 'hooks/use-async-effect';
import SubjectList from 'pages/SubjectList';
import FlashCardList from 'pages/FlashCardList';

import useStore from './store';
import './App.css';

function App() {
  const { subject, selectSubjectById } = useStore();
  const { subjects, fetchSubjects } = useStore();
  const [questions, setQuestions] = useState([]);

  const handleSubjectSelect = selectSubjectById;
  const handleBack2Subjects = () => selectSubjectById(null);

  useAsyncEffect(fetchSubjects, []);

  useAsyncEffect(async () => {
    const content = await (await fetch(process.env.REACT_APP_QUIZ_URL)).text();
    const [, ...rowQuestions] = content.split('#### ');
    const questions = rowQuestions.map((row) => {
      const [question, ...rest] = row.split(/- /);
      const last = rest.pop();
      const options = [...rest, ...last.split(/- |\[Reference|NOTE:|\*\*Explanation\*\*/)];
      return {
        question,
        refs: options.filter((opt) => !/\[( |x)\] /.test(opt)).map((ref) => `[Reference${ref}`),
        options: options.filter((opt) => /\[( |x)\] /.test(opt)),
        interval: 0,
        repetition: 0,
        efactor: 2.5,
      };
    });
    setQuestions(questions);
  }, []);

  return (
    <div className="todo-app">
      {!subject && <SubjectList subjects={subjects} onSubjectSelect={handleSubjectSelect} />}
      {subject && <FlashCardList subject={subject} questions={questions} onBack2Subjects={handleBack2Subjects} />}
    </div>
  );
}

export default App;
