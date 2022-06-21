import {
    Box,
    Card,
    IconButton,
    InputBase,
    Typography,
    useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

const Kana = ({ endQuiz, data }) => {
    const theme = useTheme();
    const [counter, setCounter] = useState(5);
    const [cur, setCur] = useState(null); // element
    const [wrong, setWrong] = useState([]); // wrong elements
    const [answer, setAnswer] = useState("");
    const [status, setStatus] = useState({
        correct: 0,
        incorrect: 0,
    });
    let copy = data;

    const handleChangeKana = () => {
        let idx = Math.round(Math.random() * (copy.length - 1));
        setCur(copy[idx]);
        copy = copy.filter((p, i) => i !== idx);
    };

    const handleChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleKey = (e) => {
        if (e.keyCode === 13 && answer) {
            if (cur.roumaji !== answer) {
                setWrong((prev) => [
                    ...prev,
                    { question: cur.kana, answer: cur.roumaji, given: answer },
                ]);
                setStatus((prev) => ({
                    ...prev,
                    incorrect: prev.incorrect + 1,
                }));
            } else {
                setStatus((prev) => ({ ...prev, correct: prev.correct + 1 }));
            }
            handleChangeKana();
            setAnswer("");
        }
    };

    useEffect(() => {
        // Initialize kana
        handleChangeKana();

        // Timer runs every second
        const interval = setInterval(() => {
            setCounter((prev) => prev - 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [data]);

    // End quiz when time runs out
    useEffect(() => {
        if (counter === 0) {
            endQuiz(status, wrong);
        }
    }, [counter]);

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
                <Box>
                    <Typography variant="h6" align="left" color="text.primary">
                        Correct :{" "}
                        <span style={{ color: theme.palette.success.main }}>
                            {status.correct}
                        </span>
                    </Typography>
                    <Typography variant="h6" align="left" color="text.primary">
                        Incorrect :{" "}
                        <span style={{ color: theme.palette.error.main }}>
                            {status.incorrect}
                        </span>
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h6" align="right" color="text.primary">
                        Time Left :{" "}
                        <span className="highlight">{counter}s</span>
                    </Typography>
                </Box>
            </Box>
            {cur && (
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    sx={{ m: 2 }}
                >
                    <Card sx={{ width: "100%", maxWidth: "350px", p: 2 }}>
                        <Typography align="center" variant="h1">
                            {cur.kana}
                        </Typography>
                        <InputBase
                            sx={{
                                borderBottom: 1,
                                width: "100%",
                                align: "center",
                                "& input": {
                                    textAlign: "center",
                                },
                            }}
                            value={answer}
                            onChange={handleChange}
                            placeholder="Type Romaji Here"
                            onKeyDown={handleKey}
                        />
                    </Card>
                </Box>
            )}
        </Box>
    );
};

export default Kana;
