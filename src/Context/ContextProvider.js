import React, { createContext, useState } from 'react'
export const AppContext = createContext(null);


const ContextProvider = ({ children }) => {

  return (
    <AppContext.Provider
      value={{
    
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider
