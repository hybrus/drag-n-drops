import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);


export const BarChart = ({ graphData, title }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    const labels = graphData.map(point => point.label);

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                data: graphData.map(point => point.value),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ],
    };

    return <Bar options={options} data={data} />;
}
