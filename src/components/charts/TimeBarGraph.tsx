/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import { ChartColors } from '../../types/ChartColors';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface TimeBarGraphProps {
    chartData: unknown[];
    chartDataColumns: string[];
    chartDataTimeColumn: string;
    chartColors: ChartColors;
}


export const TimeBarGraph: React.FC<TimeBarGraphProps>= ({ chartData, chartDataColumns, chartDataTimeColumn, chartColors }) => {

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

    chartDataColumns = chartDataColumns.filter((column: string) => column !== chartDataTimeColumn);

    let bgIdx = 0, boIdx = 0;
    
    const datasets = chartDataColumns.map((column: string) => {
        if (column !== chartDataTimeColumn) {
            return {
                fill: true,
                label: column,
                data: chartData.map((item: any) => item[column]),
                backgroundColor: chartColors.backgroundColor[bgIdx++],
                borderColor: chartColors.borderColor[boIdx++],
                borderWidth: 2
            };
        }
    });

    const data: ChartData<"bar", any[], string> = {
        labels,
        datasets: datasets as any[]
    };

    return (
        <Bar
            data={data}
            options={options}
        />
    );
}
