import React, { useEffect, useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Keyboard, Mousewheel, Navigation } from "swiper"
import { Box, Typography } from "@mui/material"
import ItemCard from "../../components/ItemCard/ItemCard"
import Loader from "../../components/Loader/Loader"

import { List } from "../../components/Types"

import "swiper/css"
import "swiper/css/navigation"
import "./Discover.css"

type Props = {
    lists: List[]
    loading: boolean
    error: string
    changeScore: (
        item_id: number,
        is_in_favourites: boolean,
        rating: number | null
    ) => void
}

const Discover = ({ lists, loading, error, changeScore }: Props) => {
    if (loading) {
        return <Loader />
    }

    if (error !== "") {
        return <div>{error}</div>
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
            {lists
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
                            {list.items.map(
                                ({ item, is_in_favourites, rating }, j) => (
                                    <SwiperSlide
                                        key={i.toString() + "-" + j.toString()}
                                    >
                                        <ItemCard
                                            item={item}
                                            is_in_favourites={is_in_favourites}
                                            rating={rating}
                                            changeScore={changeScore}
                                        />
                                    </SwiperSlide>
                                )
                            )}
                        </Swiper>
                    </div>
                ))}
        </Box>
    )
}

export default Discover
