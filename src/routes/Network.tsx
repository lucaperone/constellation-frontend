import React from "react"

import Graph from "../components/Graph/Graph"
import Loader from "../components/Loader/Loader"

type Props = {
    graph: JSON
    loading: boolean
    error: string
}

const Network = ({ graph, loading, error }: Props) => {
    if (loading) {
        return <Loader />
    }

    if (error !== "") {
        return <div>{error}</div>
    }

    return (
        <>
            <Graph data={graph} />
        </>
    )
}

export default Network
