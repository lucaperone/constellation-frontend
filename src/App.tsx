import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Grid } from "@mui/material"

import Navbar from "./components/Navbar/Navbar"
import DataPreLoader from "./DataPreLoader"

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#ff0046" },
    },
})

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Grid
                container
                spacing={0}
                wrap={"nowrap"}
                sx={{ width: "100%", height: "100%" }}
            >
                <Grid item xs="auto">
                    <Navbar />
                </Grid>
                <Grid item xs sx={{ minWidth: 0 }}>
                    <DataPreLoader />
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default App
