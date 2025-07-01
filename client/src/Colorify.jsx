import { createContext, useContext } from "react";

const ThemeContext = createContext();

function Colorify({ children }) {
    const themes = {
        light: {
            foreground: '#000',
            background: '#fff'
        },
        dark: {
            foreground: '#ddd',
            background: '#1d2a35'
        }
    };

    return (
        <ThemeContext.Provider value={themes}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useColorify = () => useContext(ThemeContext);
export default Colorify;