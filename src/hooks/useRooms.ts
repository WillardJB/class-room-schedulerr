import { useContext } from 'react';
import { RoomContext } from '../context/RoomContext';

// Custom hook to access the rooms context
export const useRooms = () => {
  const context = useContext(RoomContext);

  if (!context) {
    throw new Error('useRooms must be used within a RoomProvider');
  }

  return context;
};
