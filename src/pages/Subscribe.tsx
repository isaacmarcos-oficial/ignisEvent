import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, User } from "lucide-react";
import { WhatsappLogo } from "phosphor-react";
import { toast } from "sonner";

export function Subscribe() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true)

    try {
      const response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": import.meta.env.VITE_BREVO_API,
        },
        body: JSON.stringify({
          email,
          attributes: {
            NOME: name,
            EMAIL: email,
            WHATSAPP: "55" + phone,
            SMS: "55" + phone,
          },
          listIds: [11],
        }),
      });

      setIsLoading(false);
      const responseData = await response.json();

      if (response.ok)
      {
        localStorage.setItem("name", name);
        toast.success("Assinatura bem-sucedida!");
        navigate("/event");
      } else if (
        responseData.code &&
        responseData.code === "duplicate_parameter"
      ) {
        const updateResponse = await fetch(
          "https://api.brevo.com/v3/contacts/lists/11/contacts/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-key": import.meta.env.VITE_BREVO_API,
            },
            body: JSON.stringify({
              emails: [email],
            }),
          }
        );
        const updateResponseData = await updateResponse.json();

        const updateContactResponse = await fetch(
          `https://api.brevo.com/v3/contacts/${email}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "api-key": import.meta.env.VITE_BREVO_API,
            },
            body: JSON.stringify({
              email,
              attributes: {
                NOME: name,
                WHATSAPP: "55" + phone,
                SMS: "55" + phone,
              },
            }),
          }
        );

        const updateContactResponseData = await updateContactResponse.json();

        localStorage.setItem("name", name);
        toast.success("Assinatura bem-sucedida!");
        navigate("/event");
      } else {
        toast("Falha na assinatura");
      }
    } catch (erro) {
      setIsLoading(false);
      toast.error(
        "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente."
      );
    }
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center px-8">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto lg:flex-col lg:gap-16">
        <div className="max-w-[640px]">
          <Logo />

          <h1 className="mt-8 text-[2.5rem] leading-tight font-bold">
            Conheça e prepare-se para a{" "}
            <strong className="text-green-500">
              Consagração Total À Santíssima Virgem Maria
            </strong>
            .
          </h1>
          <p className="mt-4 leading-relaxed">
            Sinta-se preparado(a) para se consagrar à Santíssima Virgem Maria
            pelo método conhecido por ser uma{" "}
            <strong className="text-green-500">Fábrica de Santidade</strong>.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">
            Inscreva-se gratuitamente
          </strong>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col gap-2 w-full"
          >
            <div className="relative items-center">
              <User className="absolute ml-4 top-4 left-0 h-6 w-6 text-gray-400 pointer-events-none" />
              <Input
                className="bg-gray-900 w-full rounded pl-12 pr-5 h-14"
                type="text"
                id="name"
                autoComplete="name"
                placeholder="Seu nome completo"
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="relative items-center">
              <WhatsappLogo className="absolute ml-4 top-4 left-0 h-6 w-6 text-gray-400 pointer-events-none" />
              <Input
                className="bg-gray-900 w-full rounded pl-12 pr-5 h-14"
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Seu número de WhatsApp"
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="relative items-center">
              <Mail className="absolute ml-4 top-4 left-0 h-6 w-6 text-gray-400 pointer-events-none" />
              <Input
                className="bg-gray-900 w-full rounded pl-12 pr-5 h-14"
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Digite seu e-mail"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="mt-4 bg-green-500 text-zinc-900 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Gerando inscrição" : "Garantir minha vaga"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
