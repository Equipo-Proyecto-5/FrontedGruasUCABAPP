import React, { createContext, useContext, useState } from 'react';

// Definición de la interfaz para el contexto
interface AuthContextProps {
  userId: string | null;
  vehiculoId: string | null;
  username: string | null;
  setUserId: (id: string) => void;
  setVehiculoId: (id: string) => void;
  setUsername: (name: string) => void;
}

// Creación del contexto
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Componente proveedor del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [vehiculoId, setVehiculoId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{
        userId,
        vehiculoId,
        username,
        setUserId,
        setVehiculoId,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
