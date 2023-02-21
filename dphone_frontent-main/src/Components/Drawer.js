import React, { useState } from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Divider,
    Toolbar,
    Typography,
    makeStyles
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
const useStyles = makeStyles(() => ({
    link: { textDecoration: "none", color: "blue", fontSize: "20px" },
    icon: { color: "white" },
    logo: { flexGrow: "1", cursor: "pointer" },
    draw: { background: "red" }
}));

function DrawerComponent() {
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <>
            <Drawer
                anchor="top"
                sx={{ width: 250, color: "#fff" }}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <Toolbar sx={{ backgroundColor: "primary.main" }}>
                    <Typography variant="h4" className={classes.logo}>
                        Navbar
                    </Typography>
                    <CloseIcon />
                </Toolbar>
                <box sx={{ backgroundColor: "primary.main" }} height="100vh">
                    <List height="100vh">
                        <Divider />
                        <ListItem onClick={() => setOpenDrawer(false)}>
                            <ListItemText>
                                <Link to="/" className={classes.link}>
                                    首页
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText>
                                <Link to="/" className={classes.link}>
                                    关于
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText>
                                <Link to="/" className={classes.link}>
                                    联系
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText>
                                <Link to="/" className={classes.link}>
                                    FAQ
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <Divider />
                    </List>
                </box>
            </Drawer>
            <IconButton
                className={classes.icon}
                onClick={() => setOpenDrawer(!openDrawer)}
            >
                <MenuIcon />
            </IconButton>
        </>
    );
}

export default DrawerComponent;
