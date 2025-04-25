/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, ReactNode } from 'react';

// Define the Room interface
interface Room {
  id: number;
  name: string;
  capacity: number;
}

// Define context type
interface RoomContextType {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}

// Create the context
export const RoomContext = createContext<RoomContextType | undefined>(undefined);

// Define the provider component props
interface RoomProviderProps {
  children: ReactNode;
}

// The RoomProvider to wrap your application with
export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, name: 'Room 1', capacity: 20 },
    { id: 2, name: 'Room 2', capacity: 25 },
  ]);

  return (
    <RoomContext.Provider value={{ rooms, setRooms }}>
      {children}
    </RoomContext.Provider>
  );
};
