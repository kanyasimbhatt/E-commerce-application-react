import { Stack } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { useVisualMode } from "../Navbar/VisualModeProvider"

type ChildrenType = {
    children: React.ReactNode;
    showHamburger: boolean
}

const Layout = ({children, showHamburger}: ChildrenType) => {
    const {darkMode} = useVisualMode();
  return (
    <Stack className={darkMode ? 'dark' : 'light'} width={'100%'} height={'100%'}>
        <Navbar showHamburger = {showHamburger}/>
        {children}
    </Stack>
  )
}

export default Layout;