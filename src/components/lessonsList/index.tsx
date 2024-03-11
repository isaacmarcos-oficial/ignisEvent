import { useGetLessonsQuery } from "@/graphql/generated";
import { Lesson } from "./Lesson";

export function LessonsList() {
  const { data } = useGetLessonsQuery();

  return (
    <div className="w-[250px] mt-6">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma das aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map((lesson) => {
          return (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              slug={lesson.slug}
              availableAt={new Date(lesson.availableAt)}
              type={lesson.lessonType}
            />
          );
        })}
      </div>
    </div>
  );
}
