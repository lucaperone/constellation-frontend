import React, { useState } from "react"
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Box,
    Rating,
    Grid,
    Chip,
} from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"

import styles from "./ItemCard.module.css"

import { Node } from "../Types"

type Props = {
    item: Node
    is_in_favourites?: boolean
    rating?: number | null
    changeScore: (
        item_id: number,
        is_in_favourites: boolean,
        rating: number | null
    ) => void
}

const ItemCard = ({ item, is_in_favourites, rating, changeScore }: Props) => {
    const [raised, setRaised] = useState(false)
    const [hoverFav, setHoverFav] = useState(false)
    const [itemRating, setItemRating] = useState(rating ? rating / 2 : null)
    const [itemFav, setItemFav] = useState(
        is_in_favourites ? is_in_favourites : false
    )

    const categories: String[] = []
    for (const category of ["Night club", "Bar", "Concert"]) {
        if (item.features[category] === 1) categories.push(category)
    }

    const handleChange = async (
        is_in_favourites: boolean,
        rating: number | null
    ) => {
        try {
            setItemRating(rating)
            setItemFav(is_in_favourites)
            changeScore(item.id, is_in_favourites, rating ? rating * 2 : null)
            const response = await fetch("http://localhost:3001/feedback", {
                method: "POST",
                body: JSON.stringify({
                    feedback: {
                        user: 1,
                        item: item.id,
                        is_in_favourites: is_in_favourites,
                        rating: rating ? rating * 2 : null,
                    },
                }),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Card
            sx={{ maxWidth: 345, position: "relative" }}
            onMouseEnter={() => setRaised(true)}
            onMouseLeave={() => setRaised(false)}
            raised={raised}
            className={styles.card}
        >
            <Box className={styles.cardImg}>
                <CardMedia
                    component="img"
                    height="140"
                    image={`https://picsum.photos/480/240?random=${item.id.toString()}`}
                    alt="random image"
                />
            </Box>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {categories.map(
                        (category, i) => (i === 0 ? "" : " - ") + category
                    )}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                </Typography>
                <Grid container wrap="wrap" spacing={1}>
                    {Object.entries(item.features)
                        .filter(
                            (feature_value) =>
                                !categories.includes(feature_value[0]) &&
                                feature_value[1] === 1
                        )
                        .map((feature_value) => (
                            <Grid item>
                                <Chip
                                    label={feature_value[0]}
                                    size="small"
                                    variant="outlined"
                                />
                            </Grid>
                        ))}
                </Grid>
                <Box
                    sx={{
                        borderRadius: "100%",
                        backgroundColor: "#151515",
                        position: "absolute",
                        right: "1rem",
                        top: "140px",
                        transform: "translateY(-50%)",
                    }}
                >
                    <IconButton
                        onMouseEnter={() => setHoverFav(true)}
                        onMouseLeave={() => setHoverFav(false)}
                        aria-label="add to favorites"
                        color={
                            itemFav
                                ? "primary"
                                : hoverFav
                                ? "primary"
                                : "default"
                        }
                        onClick={() => {
                            handleChange(!itemFav, itemRating)
                        }}
                    >
                        <FavoriteIcon
                            sx={{ pointerEvents: "none" }}
                            fontSize="medium"
                        />
                    </IconButton>
                </Box>
                <Rating
                    sx={{
                        position: "absolute",
                        left: "0.5rem",
                        top: "calc(140px - 0.5rem)",
                        transform: "translateY(-100%)",
                    }}
                    name="simple-controlled"
                    value={itemRating}
                    precision={0.5}
                    onChange={(event, newItemRating) => {
                        handleChange(itemFav, newItemRating)
                    }}
                />
            </CardContent>
        </Card>
    )
}

export default ItemCard
