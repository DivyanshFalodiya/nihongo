import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../features/quiz/quizSlice";

const store = configureStore({
    reducer: {
        quiz: quizReducer,
    },
});

export default store;
