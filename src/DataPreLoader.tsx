import React, { useEffect, useState } from "react"

import { Route, Routes } from "react-router-dom"

import Favorites from "./routes/Favorites"
import Friends from "./routes/Friends"
import Discover from "./routes/Discover/Discover"
import Network from "./routes/Network"

import { List } from "./components/Types"

const DataPreLoader = () => {
    // Should be using Redux but too bulky for two preloaders

    const [graph, setGraph] = useState<JSON>(JSON.parse("{}"))
    const [graphLoading, setGraphLoading] = useState<boolean>(true)
    const [graphError, setGrapError] = useState<string>("")

    useEffect(() => {
        fetch(`http://localhost:3001/graph/1`)
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
                setGrapError("")
            })
            .catch((err) => {
                setGrapError(err.message)
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
        fetch(`http://localhost:3001/recommendation/1/lists`)
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
                    />
                }
            />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/friends" element={<Friends />} />
        </Routes>
    )
}

export default DataPreLoader
