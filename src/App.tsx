import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Grid } from "@mui/material"
import { Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import Favorites from "./routes/Favorites"
import Friends from "./routes/Friends"
import Discover from "./routes/Discover"
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
                        <Route path="/discover" element={<Discover />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/friends" element={<Friends />} />
                    </Routes>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default App
