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
    ChartData
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
import { ChartColors } from '../../types/ChartColors';


interface LineChartProps {
    chartData: unknown[];
    chartDataColumns: string[];
    chartDataTimeColumn: string;
    fill: boolean;
    chartColors: ChartColors;
}


export const LineChart: React.FC<LineChartProps> = ({ chartData, chartDataColumns, chartDataTimeColumn, fill, chartColors }) => {


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

    let bgIdx = 0, boIdx = 0;

    const datasets = chartDataColumns.map((column: any) => {
        if (column !== chartDataTimeColumn) {
            return {
                fill: fill,
                label: column,
                data: chartData.map((item: any) => item[column]),
                backgroundColor: chartColors.backgroundColor[bgIdx++],
                borderColor: chartColors.borderColor[boIdx++],
                borderWidth: 2
            };
        }
    });

    const data: ChartData<"line", any[], string> = {
        labels,
        datasets: datasets as any[]
    };

    return (
        <Line
            options={options}
            data={data} />
    );
}
