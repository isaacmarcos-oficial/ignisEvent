import { createContext, useContext } from 'react';

export const ActiveLessonContext = createContext({ activeLessonId: null as string | null | undefined});

export const useActiveLesson = () => useContext(ActiveLessonContext);
