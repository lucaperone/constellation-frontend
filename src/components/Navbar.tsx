import React from "react"
import { NavLink } from "react-router-dom"
import {
    Drawer,
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
        <Drawer
            sx={{
                width: "auto",
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: "auto",
                    boxSizing: "border-box",
                    justifyContent: "center",
                },
            }}
            variant="permanent"
            anchor="left"
            hideBackdrop
            PaperProps={{ elevation: 1, variant: "elevation" }}
        >
            <List component="nav">
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
                        link: "/favorites",
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
        </Drawer>
    )
}

export default Navbar
