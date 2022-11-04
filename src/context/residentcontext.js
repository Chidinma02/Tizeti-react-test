import React, { createContext, useState } from "react";

export const ResidentContext = createContext({
  residents: [],
  addResidents: (newResident) => {},
  isError: false,
  setIsError: (errorState) => {},
  errorMessage: "",
  setErrorMessage: (errorMessage) => {},
});

export const ResidentContextProvider = ({ children }) => {
  const [residents, setResidents] = useState([]);

  const [isError, setIsError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const addResidents = (newResident) => {
    setResidents((oldValue) => [...oldValue, newResident]);
  };

  return (
    <ResidentContext.Provider
      value={{
        residents,
        addResidents,
        isError,
        setIsError,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </ResidentContext.Provider>
  );
};
