/**
 * @file my-context.tsx
 * @fileoverview This is the context provider for the app; it contains the global state variables for the app.
 * @see https://react.dev/reference/react/useContext for more information on React's useContext hook.
 */

import React from "react";

export type Props = {
  children: React.ReactNode;
}

export type ContextType = {
  model : string;
  setModel : React.Dispatch<React.SetStateAction<string>>;
  localSearchChecked : boolean;
  setLocalSearchChecked : React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = React.createContext<ContextType | null>(null);
export const ContextProvider = ({ children } : Props) => {

  /* Name of most recently loaded model */
  const [model, setModel] = React.useState<string>("");
  const [localSearchChecked, setLocalSearchChecked] = React.useState<boolean>(false);

  const memoizedContextValue = React.useMemo(() => ({
    model, setModel, localSearchChecked, setLocalSearchChecked
  }), [model, setModel, localSearchChecked, setLocalSearchChecked]);

  return(
    <Context.Provider value={memoizedContextValue}> { children } </Context.Provider>
  )
};

export const useContext = () => {
  const context = React.useContext(Context);
  if(!context) {
    throw new Error("Context error :( ask David what's up");
  }
  return context;
}
