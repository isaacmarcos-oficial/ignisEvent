import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { LessonsList } from "@/components/lessonsList";
import { useEffect, useState } from "react";

export function Event() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [userName, setUserName] = useState(() => localStorage.getItem('name') || "");

  useEffect(() => {
    const userName = localStorage.getItem('name')
    if (!userName) {
      navigate("/")
    } else {
      setUserName(userName)
    }
  }, [navigate])


  return (
    <div className="flex flex-col min-h-screen ">
      <Header />

      <main className="flex flex-1">
        {slug ? (
          <Video lessonId={slug} />
        ) : (
          <div className="flex w-full bg-zinc-950 justify-center align-center">
            <div className="bg-zinc-950 p-8">

              <div className="flex flex-col items-center justify-center h-screen px-4">
                <div className="max-w-md text-center">
                  <h1 className="text-4xl font-bold text-[#333] dark:text-[#F5F5F5] mb-4">Olá, {userName}!</h1>
                  <p className="text-[#666] dark:text-[#BFBFBF] mb-8">
                    Aguarde e se sinta confiante para a <strong className="text-green-500">Total Consagraças à Santíssima Virgem Maria!</strong>
                  </p>
                  <h2 className="text-zinc-600 font-bold">EM BREVE</h2>
                </div>
              </div>
              <LessonsList />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
