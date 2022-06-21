import { AppBar, Toolbar, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
    const theme = useTheme();
    return (
        <AppBar position="static">
            <Toolbar>
                <Link
                    to="/"
                    style={{
                        textDecoration: "none",
                        color: theme.palette.text.primary,
                    }}
                >
                    <Typography variant="h5">Go Nihongo</Typography>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
