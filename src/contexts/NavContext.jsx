import { createContext, useContext } from "react";

export const NavContext = createContext(null)
export function NavProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    return (
        <NavContext.Provider value={{}}>
            {children}
        </NavContext.Provider>
    )
}

export function useNav() {
    return useContext(NavContext)
}