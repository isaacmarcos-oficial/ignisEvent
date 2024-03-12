import { DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, FileArrowDown, TelegramLogo } from "phosphor-react";

import "@vime/core/themes/default.css";
import { LiveChat } from "./lessonChat";
import { LessonsList } from "./lessonsList";
import { useQuery } from "@apollo/client";
import { Lessons } from "@/graphql/types/Ead/LessonsMaterclass";
import { GET_LESSONS_BY_ID } from "@/graphql/queries/ead/LessonsMasterClass";

interface VideoProps {
  lessonId: string;
}

export function Video(props: VideoProps) {
  const { data } = useQuery<{ lessonClass: Lessons }>(GET_LESSONS_BY_ID, {
    variables: {
      id: props.lessonId,
    },
  });

  return (
    <div className="flex-1 bg-zinc-950 mt-4 ">
      <div className="flex gap-4 justify-center lg:flex-col lg:mx-8">
        <div className="h-full w-full max-w-[900px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data?.lessonClass.videoUrl || "defaultVideoId"} />
            <DefaultUi />
          </Player>
        </div>
        <LiveChat />
      </div>

      <div className="p-8 max-w-[1250px] mx-auto">
        <div className="flex items-start gap-16 md:flex-col">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {data?.lessonClass.title}
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data?.lessonClass.description}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <img
                className="h-16 w-16 rounded-full border-2 border-zinc-800"
                src={data?.lessonClass.teacherAvatar}
                alt={data?.lessonClass.teacherName}
              />

              <div className="leading-relaxed ">
                <strong className="font-bold text-2xl block">
                  {data?.lessonClass.teacherName}
                </strong>
                <span className="text-gray-200 text-sm block">
                  {data?.lessonClass.teacherBio}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:my-10 lg:my-0 ">
            <LessonsList />
          </div>
        </div>

        <div className="gap-4 mt-20 grid grid-cols-2 xs:grid-cols-1">
          <a
            href="https://t.me/serignis"
            target="_blank"
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <TelegramLogo size={40} />
            </div>
            <div className="py-6 leading-relaxed ">
              <strong className="text-2xl">Comunidade do Telegram</strong>
              <p className="text-sm text-gray-200 mt-2">
                Participe da nossa comunidade no telegram para se manter sempre
                atualizado.
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>

          <a
            href="#"
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed ">
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu
                desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
