import React, { useEffect, useState } from "react"

import {
    Avatar,
    List,
    Grid,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
} from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import Loader from "../components/Loader/Loader"
import FriendCard from "../components/FriendCard/FriendCard"
import AddIcon from "@mui/icons-material/Add"
import CheckIcon from "@mui/icons-material/Check"

import { Node } from "../components/Types"

type status = {
    [key: number]: {
        loading: boolean
        added: boolean
    }
}

const Favourites = () => {
    const [friends, setFriends] = useState<Node[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    const [suggestions, setSuggestions] = useState<Node[]>([])

    const [suggestionsStatus, setSuggestionsStatus] = useState<status>({})

    useEffect(() => {
        fetch(`http://localhost:3001/friends/1`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    )
                }
                return response.json()
            })
            .then((actualFriends) => {
                setFriends(actualFriends)
                setError("")
            })
            .catch((err) => {
                setError(err.message)
                setFriends(JSON.parse("{}"))
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:3001/recommendation/1/friends`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    )
                }
                return response.json()
            })
            .then((actualFriends: Node[]) => {
                setSuggestions(actualFriends)
            })
            .catch((err) => {
                setSuggestions([])
            })
    }, [])

    useEffect(() => {
        for (const friend of suggestions) {
            if (!suggestionsStatus.hasOwnProperty(friend.id)) {
                setSuggestionsStatus((prevState) => {
                    prevState[friend.id] = {
                        loading: false,
                        added: false,
                    }
                    return { ...prevState }
                })
            }
        }
    }, [suggestions, suggestionsStatus])

    const handleClick = async (suggestion: Node) => {
        setSuggestionsStatus((prevState) => {
            prevState[suggestion.id] = {
                loading: true,
                added: false,
            }
            return { ...prevState }
        })
        try {
            const response = await fetch("http://localhost:3001/friendship", {
                method: "POST",
                body: JSON.stringify({
                    friendship: {
                        user: 1,
                        friend: suggestion.id,
                        are_friends: true,
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
        } finally {
            setSuggestionsStatus((prevState) => {
                prevState[suggestion.id] = {
                    loading: false,
                    added: true,
                }
                return { ...prevState }
            })
            setFriends((prevState) => {
                return [suggestion, ...prevState]
            })
        }
    }

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <Grid
            container
            direction="column"
            sx={{ padding: "2rem 3rem", maxHeight: "100%", overflow: "auto" }}
            wrap="nowrap"
        >
            <Grid item xs="auto">
                <Paper
                    sx={{
                        width: "fit-content",
                        margin: "0 auto 1rem",
                        padding: "1rem 3rem",
                    }}
                    elevation={4}
                >
                    <Typography variant="h5" component="div">
                        You might know
                    </Typography>
                    <List>
                        {suggestions.map((suggestion) => (
                            <ListItem key={suggestion.id}>
                                <ListItemIcon>
                                    <Avatar
                                        alt={suggestion.name}
                                        src={`https://api.lorem.space/image/face?w=480&h=480&hash=${suggestion.id}`}
                                    />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography variant="h6">
                                        {suggestion.name}
                                    </Typography>
                                </ListItemText>
                                <LoadingButton
                                    sx={{ marginLeft: "1.5rem" }}
                                    variant="contained"
                                    endIcon={
                                        suggestionsStatus[suggestion.id] ? (
                                            suggestionsStatus[suggestion.id]
                                                .added ? (
                                                <CheckIcon />
                                            ) : (
                                                <AddIcon />
                                            )
                                        ) : (
                                            <AddIcon />
                                        )
                                    }
                                    loadingPosition="end"
                                    loading={
                                        suggestionsStatus[suggestion.id]
                                            ? suggestionsStatus[suggestion.id]
                                                  .loading
                                            : false
                                    }
                                    onClick={() => handleClick(suggestion)}
                                    disabled={
                                        suggestionsStatus[suggestion.id]
                                            ? suggestionsStatus[suggestion.id]
                                                  .added
                                            : false
                                    }
                                >
                                    Add
                                </LoadingButton>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
            <Grid item xs>
                <Grid container spacing={2}>
                    {friends.map((friend) => (
                        <Grid item xs={6} sm={3} md={2} key={friend.id}>
                            <FriendCard friend={friend} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Favourites
