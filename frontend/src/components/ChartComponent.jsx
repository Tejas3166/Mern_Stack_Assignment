import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SelectTag from "./SelectTag";
import axios from "axios";
import PieChart from "./PieChart";
const ChartComponent = () => {
  const [data, setData] = useState([]);
  let totalitems = [];
  const pricesrange = [
    "0-100",
    "101-200",
    "201-300",
    "301-400",
    "401-500",
    "501-600",
    "601-700",
    "701-800",
    "801-900",
    "901 Above",
  ];

  const chartRef = useRef(null);
  let chartInstance = null;
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: pricesrange,
        datasets: [
          {
            label: "Transactions",
            data:
              data.length === 0
                ? [20, 45, 50, 25, 35, 55, 65, 25, 30, 40]
                : data,
            backgroundColor: "#3f91a2",
          },
        ],
        borderWidth: 1,
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);
  const handleChange = (e) => {

    pricesrange.forEach((ele) => {
      axios
        .get(`http://localhost:8080/price?month=${e.target.value}&price=${ele}`)
        .then((res) => {
          totalitems.push(res.data.length);
          if (totalitems.length === 10) {
            setData(totalitems);
          }
        });
    });
  };

  return (
    <div className="h-[50vh] w-[90vh] mb-[130vh] mt-[20%]">
      <Box float="right">
        <SelectTag name="Select Month" fun={handleChange} />
      </Box>
      <canvas id="myChart" ref={chartRef} />
      <PieChart />
      <Link to="/">
        <Button colorScheme="orange" float="right" mt="2.5rem">
          Home
        </Button>
      </Link>
    </div>
  );
};

export default ChartComponent;
