import { createContext } from 'react';
import { AppContextType } from '../types/AppContext';

export const AppContext = createContext<AppContextType | null>(null);