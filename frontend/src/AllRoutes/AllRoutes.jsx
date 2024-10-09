import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import ChartComponent from "../components/ChartComponent";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path='/chart' element={<ChartComponent/>}></Route>
      </Routes>
    </div>
  );
};

export default AllRoutes;
