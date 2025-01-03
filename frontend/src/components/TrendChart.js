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
            borderColor: "rgb(140, 40, 153)",
            borderWidth: 3,
            fill: true, 
            backgroundColor: "rgba(140, 40, 153, 0.2)", 
            pointRadius: 5, 
            pointBackgroundColor: "rgb(140, 40, 153)", 
            pointHoverRadius: 8, 
            tension: 0.4, 
            borderCapStyle: "round", 
            borderJoinStyle: "round", 
            hoverBackgroundColor: "rgba(140, 40, 153, 0.5)", 
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: "nearest", 
          intersect: false, 
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "white", 
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.7)", 
            titleColor: "white", 
            bodyColor: "white", 
            bodyFont: {
              size: 14, 
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Time",
              color: "white",
            },
            grid: {
              color: "white",
              borderDash: [5, 5], 
            },
            ticks: {
              color: "white",
              font: {
                size: 12, 
              },
            },
          },
          y: {
            title: {
              display: true,
              text: "Tweet Count",
              color: "white",
            },
            grid: {
              color: "white",
              borderDash: [5, 5], 
            },
            ticks: {
              color: "white", 
              font: {
                size: 12, 
              },
            },
          },
        },
        elements: {
          line: {
            tension: 0.4, 
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
