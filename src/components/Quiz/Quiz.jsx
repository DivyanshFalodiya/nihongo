import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Kana from "./Kana/Kana";
import PreQuiz from "./PreQuiz";
import PostQuiz from "./PostQuiz";
import hiragana from "../../data/hiragana.json";
import katakana from "../../data/katakana.json";
import "./Quiz.css";

const types = ["hiragana", "katakana", "kanji-n5"];

// Quiz Component
const Quiz = () => {
    const { type } = useParams();
    const [status, setStatus] = useState(-1); // -1 0 1
    const [data, setData] = useState([]);
    const [isKana, setIsKana] = useState(true);
    const [endState, setEndState] = useState();
    const navigate = useNavigate();

    // Handle Quiz Start
    const handleStart = () => setStatus(0);

    // Handle Quiz End
    // Take some data here in arguments to display better results
    const handleEnd = (endState, wrongSubmissions) => {
        setStatus(1);
        setEndState({ state: endState, wrong: wrongSubmissions });
    };

    // Reset the status
    const handleReset = () => {
        setStatus(-1);
    };

    // Some validation and data fetching
    useEffect(() => {
        if (!type) navigate("/");
        if (types.findIndex((t) => t === type) === -1) navigate("/");

        if (type === "hiragana") setData(hiragana);
        else if (type === "katakana") setData(katakana);
        else {
            setIsKana(false);
        }
    }, []);

    return (
        <Box>
            <Typography variant="h3" color="primary" align="left">
                Quiz - {type.toUpperCase()}
            </Typography>
            <Box>
                {status === -1 && (
                    <PreQuiz
                        startQuiz={handleStart}
                        type={type.toUpperCase()}
                    />
                )}
                {status === 0 &&
                    (isKana ? <Kana data={data} endQuiz={handleEnd} /> : null)}
                {status === 1 && (
                    <PostQuiz state={endState} reset={handleReset} />
                )}
            </Box>
        </Box>
    );
};

export default Quiz;
