import { Lesson } from "./Lesson";
import { useQuery } from "@apollo/client";
import { Lessons } from "@/graphql/types/Ead/LessonsMaterclass";
import { GET_LESSONS } from "@/graphql/queries/ead/LessonsMasterClass";

export function LessonsList() {
  const { data } = useQuery<{ allLessonsClass: Lessons[] }>(
    GET_LESSONS,{}
  );

  return (
    <div className="w-[250px] mt-6">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma das aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.allLessonsClass.map((lesson) => {
          return (
            <Lesson
              key={lesson.id}
              id={lesson.id}
              title={lesson.title}
              slug={lesson.id}
              availableAt={new Date(lesson.availableAt)}
              type={lesson.lessonType}
            />
          );
        })}
      </div>
    </div>
  );
}
