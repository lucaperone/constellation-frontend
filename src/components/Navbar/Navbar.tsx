import React from "react"
import { NavLink } from "react-router-dom"
import {
    Paper,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    SvgIcon,
} from "@mui/material"
import HubIcon from "@mui/icons-material/Hub"
import TravelExploreIcon from "@mui/icons-material/TravelExplore"
import FavoriteIcon from "@mui/icons-material/Favorite"
import GroupIcon from "@mui/icons-material/Group"

import "./Navbar.css"

const Navbar = () => {
    return (
        <Paper
            elevation={6}
            variant="elevation"
            sx={{ height: "100%", display: "flex" }}
            square
        >
            <List component="nav" sx={{ alignSelf: "center" }}>
                {[
                    {
                        icon: HubIcon,
                        link: "/",
                    },
                    {
                        icon: TravelExploreIcon,
                        link: "/discover",
                    },
                    {
                        icon: FavoriteIcon,
                        link: "/favourites",
                    },
                    {
                        icon: GroupIcon,
                        link: "/friends",
                    },
                ].map(({ icon, link }, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            divider={index !== 3}
                            sx={{ padding: 0 }}
                        >
                            <NavLink to={link}>
                                <ListItemIcon
                                    sx={{ minWidth: "0px", padding: "1rem" }}
                                >
                                    <SvgIcon
                                        fontSize="large"
                                        sx={{ display: "block" }}
                                        component={icon}
                                    />
                                </ListItemIcon>
                            </NavLink>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}

export default Navbar
