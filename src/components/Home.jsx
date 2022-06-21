import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from "@mui/material";

const links = [
    { path: "/hiragana-quiz", text: "あ", caption: "Hiragana" },
    { path: "/katakana-quiz", text: "ア", caption: "Katakana" },
];

const Home = () => {
    return (
        <>
            <Box>
                <Typography variant="h3" color="primary">
                    Practice and Learn
                </Typography>
                <Grid container>
                    {links.map((l, idx) => (
                        <Grid item key={idx} sx={{ p: 2 }}>
                            <Card
                                sx={(theme) => ({
                                    width: "200px",
                                })}
                            >
                                <CardActionArea>
                                    <Typography
                                        variant="h1"
                                        fontSize={"10rem"}
                                        align="center"
                                    >
                                        {l.text}
                                    </Typography>
                                    <CardContent>
                                        <Typography variant="h6" align="center">
                                            {l.caption}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default Home;
