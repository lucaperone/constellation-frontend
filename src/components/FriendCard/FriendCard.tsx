import React, { useState } from "react"
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Avatar,
} from "@mui/material"

import { Node } from "../Types"

type Props = {
    friend: Node
}

const FriendCard = ({ friend }: Props) => {
    const [raised, setRaised] = useState(false)

    return (
        <Card
            onMouseEnter={() => setRaised(true)}
            onMouseLeave={() => setRaised(false)}
            raised={raised}
        >
            <CardActionArea>
                <CardMedia sx={{ padding: "1rem 1.5rem 0 1.5rem" }}>
                    <Avatar
                        alt={friend.name}
                        src={`https://api.lorem.space/image/face?w=480&h=480&hash=${friend.id}`}
                        sx={{ width: "100%", height: "auto" }}
                        variant="rounded"
                    />
                </CardMedia>
                <CardContent sx={{ paddingY: "0.5rem" }}>
                    <Typography variant="h6" component="div" align="center">
                        {friend.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default FriendCard
