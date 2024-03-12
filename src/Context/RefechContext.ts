import { createContext, Dispatch, SetStateAction } from 'react';

// Defina o tipo para o valor do contexto, incluindo o tipo para a função refetch.
type RefetchContextType = {
  refetch: () => void;
  setRefetchFunction?: Dispatch<SetStateAction<() => void>>;
} | null; // Aqui adicionamos 'null' para permitir que o contexto inicial seja null.

// Crie o contexto com o tipo definido.
export const RefetchContext = createContext<RefetchContextType>(null);
