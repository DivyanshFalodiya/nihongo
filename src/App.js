import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
    const theme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    background: theme.palette.background.default,
                    minHeight: "100vh",
                }}
            >
                <Navbar />
                <Container sx={{ py: 5 }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </BrowserRouter>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
