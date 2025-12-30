import { useContext } from "react"
import ThemeContext from "../context/theme-context"

const useThemeContext = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useThemeContext must be used within ThemeProvider')
    }

    return context;
}

export default useThemeContext
