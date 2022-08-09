import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Grid } from "@mui/material"
import { Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import Favourites from "./routes/Favourites"
import Friends from "./routes/Friends"
import Lists from "./routes/Lists"
import Network from "./routes/Network"

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
})

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Grid container spacing={0}>
                <Grid item xs="auto">
                    <Navbar />
                </Grid>
                <Grid item xs>
                    <Routes>
                        <Route path="/" element={<Network />} />
                        <Route path="/lists" element={<Lists />} />
                        <Route path="/favourites" element={<Favourites />} />
                        <Route path="/friends" element={<Friends />} />
                    </Routes>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default App
