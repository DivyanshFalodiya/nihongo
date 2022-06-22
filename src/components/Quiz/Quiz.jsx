import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Kana from "./Kana/Kana";
import Vocab from "./Vocab/Vocab";
import PreQuiz from "./PreQuiz";
import PostQuiz from "./PostQuiz";
import hiragana from "../../data/hiragana.json";
import katakana from "../../data/katakana.json";
import Wrapper from "./Wrapper";
import "./Quiz.css";

// Valid types
const types = ["hiragana", "katakana", "vocab"];

// Quiz Component
const Quiz = () => {
    const { type } = useParams();
    const [status, setStatus] = useState(-1); // -1 0 1
    const [data, setData] = useState([]);
    const [isKana, setIsKana] = useState(true);
    const [level, setLevel] = useState(5);
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

    // Fetch vacab by level
    const fetchVocab = async (lev) => {
        try {
            const res = await fetch(
                "https://jlpt-keiz.vercel.app/api/words?level=" +
                    lev +
                    "&limit=1000"
            );
            if (res.ok) {
                return await res.json();
            }
        } catch (e) {
            console.log(e);
        }
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

    // On level change
    useEffect(() => {
        setData([]);
        if (type !== "hiragana" && type !== "katakana") {
            fetchVocab(level).then((res) => {
                setData(res.words);
            });
        }
    }, [level]);

    return (
        <Box>
            <Typography variant="h3" color="primary" align="left">
                Quiz - {type.toUpperCase()}
            </Typography>
            <Box>
                {status === -1 && (
                    <PreQuiz
                        isKana={isKana}
                        startQuiz={handleStart}
                        type={type.toUpperCase()}
                        setLevel={setLevel}
                        level={level}
                        isDisabled={data.length === 0}
                    />
                )}
                {data.length > 0 && status === 0 && (
                    <Wrapper
                        data={data}
                        endQuiz={handleEnd}
                        Component={isKana ? Kana : Vocab}
                    />
                )}
                {data.length > 0 && status === 1 && (
                    <PostQuiz state={endState} reset={handleReset} />
                )}
            </Box>
        </Box>
    );
};

export default Quiz;
