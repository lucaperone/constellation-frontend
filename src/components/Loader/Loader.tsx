import React from "react"

import { Box } from "@mui/material"
import { PacmanLoader } from "react-spinners"

const Loader = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
            }}
        >
            <PacmanLoader loading={true} color="#ff0046" />
        </Box>
    )
}

export default Loader
