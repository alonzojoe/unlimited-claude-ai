import { createContext } from 'react';
import type { IThemeContext } from '../types';

const ThemeContext = createContext<IThemeContext | null>(null);

export default ThemeContext;
