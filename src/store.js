import create from 'zustand';
import { getSubjects } from 'db/subjects.locale';

const useStore = create((set) => ({
  subject: null, // selected subject at any point in time
  subjects: [], // list of available subject
  questions: [], // list of questions available for selected subject
  fetchSubjects: async () => {
    const subjects = await getSubjects();
    set((state) => ({ ...state, subjects }));
  },
  setQuestions: (questions) => set((state) => ({ ...state, questions })),
  selectSubjectById: (id) => set((state) => ({ ...state, subject: state.subjects.find(({ _id }) => id === _id) })),
}));

export default useStore;
