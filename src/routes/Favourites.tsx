import React, { useEffect, useState } from "react"

import { Grid } from "@mui/material"
import Loader from "../components/Loader/Loader"

import { Node } from "../components/Types"
import ItemCard from "../components/ItemCard/ItemCard"

type FavouritesList = {
    item: Node
    rating: number
}[]

type Props = {
    changeScore: (
        item_id: number,
        is_in_favourites: boolean,
        rating: number | null
    ) => void
}

const Favourites = ({ changeScore }: Props) => {
    const [favourites, setFavourites] = useState<FavouritesList>([])
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
            {favourites.map(({ item, rating }) => (
                <Grid item xs={4} key={item.id}>
                    <ItemCard
                        item={item}
                        is_in_favourites={true}
                        rating={rating}
                        changeScore={changeScore}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default Favourites
