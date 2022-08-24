import React, { useState } from "react"
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
} from "@mui/material"

import { Node } from "../Types"

type Props = {
    item: Node
}

const ItemCard = ({ item }: Props) => {
    const [raised, setRaised] = useState(false)

    const categories: String[] = []
    for (const category of ["Night club", "Bar", "Concert"]) {
        if (item.features[category] === 1) categories.push(category)
    }

    return (
        <Card
            sx={{ maxWidth: 345 }}
            onMouseEnter={() => setRaised(true)}
            onMouseLeave={() => setRaised(false)}
            raised={raised}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={`https://picsum.photos/480/240?random=${item.id.toString()}`}
                    alt="random image"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {categories.map(
                            (category, i) => (i === 0 ? "" : " - ") + category
                        )}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {/* <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
            </CardActions> */}
        </Card>
    )
}

export default ItemCard
