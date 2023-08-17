/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

import moment from 'moment';
import { getRandomNeonColor } from '../../utils/Helper';


export const LineChart = ({ chartData, chartDataColumns, chartDataTimeColumn, fill }: any) => {


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Bar Chart'
            },
        },
    };

    const labels = chartData.map((item: any) => moment(item[chartDataTimeColumn]).format('MMM YYYY'));

    chartDataColumns = chartDataColumns.filter((column: any) => column !== chartDataTimeColumn);

    const differentBackgroundColors = getRandomNeonColor(chartDataColumns.length);

    const datasets = chartDataColumns.map((column: any) => {
        if (column !== chartDataTimeColumn) {
            const borderColor = differentBackgroundColors.pop();
            const bgColor = borderColor + '33';
            return {
                fill: fill,
                label: column,
                data: chartData.map((item: any) => item[column]),
                backgroundColor: bgColor,
                borderColor: borderColor,
            };
        }
    });

    const data = {
        labels,
        datasets: datasets
    };

    return (
        <Line
            options={options}
            data={data} />
    );
}
