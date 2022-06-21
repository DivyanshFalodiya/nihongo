import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

// Pre to Quiz Start
const PreQuiz = ({ startQuiz, type }) => {
    const [timer, setTimer] = useState(5);
    const [inter, setInter] = useState(null);
    const [disabled, setDisabled] = useState(false);

    // Handle Start Button
    const handleClick = () => {
        setDisabled(true);
        setInter(
            setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000)
        );
    };

    // On timer change
    useEffect(() => {
        if (timer === 0) {
            clearInterval(inter);
            startQuiz();
        }
    }, [timer]);

    return (
        <Box sx={{ py: 3 }}>
            <Typography variant="h6" color="text.primary">
                The quiz will be timed for{" "}
                <span className="highlight">30 seconds</span>. Please click on
                the <span className="highlight">START</span> button to begin the
                quiz.
            </Typography>
            <Box display={"flex"} alignItems={"center"} sx={{ my: 3 }}>
                <Button
                    variant="contained"
                    onClick={handleClick}
                    disabled={disabled}
                >
                    Start
                </Button>
                {inter && (
                    <Typography
                        sx={{ mx: 3, transition: "0.5s ease" }}
                        align="center"
                        color="text.primary"
                    >
                        {timer}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default PreQuiz;
