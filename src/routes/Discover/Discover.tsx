import React, { useEffect, useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Keyboard, Mousewheel, Navigation } from "swiper"
import { Box, Typography } from "@mui/material"
import ItemCard from "../../components/ItemCard/ItemCard"
import Loader from "../../components/Loader/Loader"

import { Item } from "../../components/Types"

import "swiper/css"
import "swiper/css/navigation"
import "./Discover.css"

type List = {
    title: string
    ref?: {
        type: string
        id: number
        name: string
    }
    url: string
    items: Item[]
}

const Discover = () => {
    const [data, setData] = useState<List[]>([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
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
            .then((actualData) => {
                setData(actualData)
                setError("")
            })
            .catch((err) => {
                setError(err.message)
                setData(JSON.parse("{}"))
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <Box
            sx={{
                overflow: "auto",
                width: "100%",
                height: "100%",
                position: "relative",
                padding: "2rem 0",
            }}
        >
            {data
                .filter((list) => list.items.length !== 0)
                .map((list, i) => (
                    <div key={i}>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ padding: "0 3rem" }}
                        >
                            {list.title}
                            {list.ref ? <b> {list.ref.name}</b> : ""}
                        </Typography>
                        <Swiper
                            navigation={true}
                            modules={[Navigation, Mousewheel, Keyboard]}
                            className="mySwiper"
                            slidesPerView={"auto"}
                            spaceBetween={30}
                            slidesOffsetBefore={48}
                        >
                            {list.items.map((item, j) => (
                                <SwiperSlide
                                    key={i.toString() + "-" + j.toString()}
                                >
                                    <ItemCard item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ))}
        </Box>
    )
}

export default Discover
