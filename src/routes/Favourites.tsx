import React, { useEffect, useState } from "react"

import { Grid } from "@mui/material"
import Loader from "../components/Loader/Loader"

import { Item } from "../components/Types"
import ItemCard from "../components/ItemCard/ItemCard"

const Favourites = () => {
    const [favourites, setFavourites] = useState<Item[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        fetch(`http://localhost:3001/favourites/1`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    )
                }
                return response.json()
            })
            .then((actualFavourites) => {
                setFavourites(actualFavourites)
                setError("")
            })
            .catch((err) => {
                setError(err.message)
                setFavourites(JSON.parse("{}"))
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <Grid container spacing={3} sx={{ padding: "3rem" }}>
            {favourites.map((favourite) => (
                <Grid item xs={4} key={favourite.id}>
                    <ItemCard item={favourite} />
                </Grid>
            ))}
        </Grid>
    )
}

export default Favourites
