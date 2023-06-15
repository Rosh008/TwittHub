import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Tweets from "./pages/Tweets";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/tweets" element={<Tweets />} />
    </Routes>
  );
}
