import React, { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextType {
  minScore: number;
  setMinScore: (score: number) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [minScore, setMinScore] = useState(0);

  return (
    <FilterContext.Provider value={{ minScore, setMinScore }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};


