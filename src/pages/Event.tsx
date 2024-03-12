import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { LessonsList } from "@/components/lessonsList";
import { useEffect, useState } from "react";

export function Event() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate(); // Usa o hook useNavigate
  const [userName, setUserName] = useState(() => localStorage.getItem('name') || "");

  useEffect(() => {
    const userName = localStorage.getItem('name')
    if(!userName) {
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
              <LessonsList />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
