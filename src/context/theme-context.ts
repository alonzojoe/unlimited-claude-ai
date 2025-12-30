import { createContext } from 'react';
import type { IThemeContext } from '../types';

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export default ThemeContext;
