import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import SelectTag from "./SelectTag";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Piechart } from "../Redux/action";
const PieChart = () => {
  const dispatch = useDispatch();
  const [month, setMonth] = useState("January");
  const stats = useSelector((items) => {
    return items.TransactionData.piechartcategory;
  }, shallowEqual);
  // Data for the pie chart
  useEffect(() => {
    dispatch(Piechart(month));
  }, [month]);
  const data = {
    labels: ["Electronics", "Mens", "Womens"],
    datasets: [
      {
        data: [
          stats?.electronics,
          stats?.["men's clothing"],
          stats?.["women's clothing"],
        ],
        backgroundColor: ["red", "blue", "yellow"],
      },
    ],
  };

  const onChangefun = (e) => {
    setMonth(e.target.value);
  };
  return (
    <div className="mt-10 text-center font-bold	">
      <h1>Pie Chart </h1>
      <SelectTag fun={onChangefun} />
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
