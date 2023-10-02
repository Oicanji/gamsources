import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";

const Navegation = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<p>profile</p>}></Route>
            <Route path="/register" element={<p>register</p>}></Route>
        </Routes>
    );
};

export default Navegation;