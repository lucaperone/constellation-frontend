import React, { useEffect, useState } from "react"

import { Route, Routes } from "react-router-dom"

import Favourites from "./routes/Favourites"
import Friends from "./routes/Friends"
import Discover from "./routes/Discover/Discover"
import Network from "./routes/Network"

import { List } from "./components/Types"

const DataPreLoader = () => {
    // Should be using Redux but too bulky for two preloaders

    const [graph, setGraph] = useState<JSON>(JSON.parse("{}"))
    const [graphLoading, setGraphLoading] = useState<boolean>(true)
    const [graphError, setGraphError] = useState<string>("")

    useEffect(() => {
        fetch(`https://constellation-api.herokuapp.com/graph/1`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    )
                }
                return response.json()
            })
            .then((actualGraph) => {
                setGraph(actualGraph)
                setGraphError("")
            })
            .catch((err) => {
                setGraphError(err.message)
                setGraph(JSON.parse("{}"))
            })
            .finally(() => {
                setGraphLoading(false)
            })
    }, [])

    const [lists, setLists] = useState<List[]>([])
    const [listsError, setListsError] = useState("")
    const [listsLoading, setListsLoading] = useState(true)
    useEffect(() => {
        fetch(`https://constellation-api.herokuapp.com/recommendation/1/lists`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    )
                }
                return response.json()
            })
            .then((actualLists) => {
                setLists(actualLists)
                setListsError("")
            })
            .catch((err) => {
                setListsError(err.message)
                setLists(JSON.parse("{}"))
            })
            .finally(() => {
                setListsLoading(false)
            })
    }, [])

    function changeScore(
        item_id: number,
        is_in_favourites: boolean,
        rating: number | null
    ) {
        setLists((prevLists) => {
            return prevLists.map((list) => {
                return {
                    ...list,
                    items: list.items.map((obj) => {
                        if (obj.item.id === item_id) {
                            obj.is_in_favourites = is_in_favourites
                            obj.rating = rating
                        }
                        return obj
                    }),
                }
            })
        })
    }

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Network
                        graph={graph}
                        loading={graphLoading}
                        error={graphError}
                    />
                }
            />
            <Route
                path="/discover"
                element={
                    <Discover
                        lists={lists}
                        loading={listsLoading}
                        error={listsError}
                        changeScore={changeScore}
                    />
                }
            />
            <Route
                path="/favourites"
                element={<Favourites changeScore={changeScore} />}
            />
            <Route path="/friends" element={<Friends />} />
        </Routes>
    )
}

export default DataPreLoader
