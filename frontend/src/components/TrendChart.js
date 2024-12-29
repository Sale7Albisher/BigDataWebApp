import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const TrendChart = ({ trendData }) => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!trendData || trendData.length === 0) {
      console.log("No trend data available.");
      return;
    }

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: trendData.map((point) => point.time),
        datasets: [
          {
            label: "Tweet Count",
            data: trendData.map((point) => point.count),
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Time",
            },
          },
          y: {
            title: {
              display: true,
              text: "Tweet Count",
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [trendData]);

  return (
    <>
      {(!trendData || trendData.length === 0) && <div>No data available</div>}
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default TrendChart;
