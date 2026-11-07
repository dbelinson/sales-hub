import { createContext, useContext, useState, type ReactNode } from "react";
import { seedCustomers, type Customer, type CustomerInput } from "@/data/customers";

interface CustomersContextValue {
  customers: Customer[];
  notes: Record<string, string>;
  addCustomer: (input: CustomerInput) => void;
  setNote: (id: string, text: string) => void;
}

const CustomersContext = createContext<CustomersContextValue | null>(null);

export function CustomersProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(seedCustomers);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const addCustomer = (input: CustomerInput) => {
    setCustomers((prev) => [{ id: crypto.randomUUID(), ...input }, ...prev]);
  };

  const setNote = (id: string, text: string) => {
    setNotes((prev) => ({ ...prev, [id]: text }));
  };

  return (
    <CustomersContext.Provider value={{ customers, notes, addCustomer, setNote }}>
      {children}
    </CustomersContext.Provider>
  );
}

export function useCustomers(): CustomersContextValue {
  const context = useContext(CustomersContext);
  if (!context) throw new Error("useCustomers must be used inside CustomersProvider");
  return context;
}
