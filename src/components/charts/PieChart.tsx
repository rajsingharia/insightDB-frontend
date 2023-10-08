/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartData
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ChartColors } from '../../types/ChartColors';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    chartData: unknown[];
    chartDataColumns: string[];
    chartColors: ChartColors;
}

export const PieChart: React.FC<PieChartProps> = ({ chartData, chartDataColumns, chartColors}) => {

    const datasets = [
        {
            data: chartDataColumns.map((column: string) => {
                return chartData.map((item: any) => item[column])
            }),
            backgroundColor: chartColors.backgroundColor,
            borderColor: chartColors.borderColor,
            borderWidth: 2
        }
    ];

    const data: ChartData<"pie", any[], string> = {
        labels: chartDataColumns,
        datasets: datasets as any[]
    }

    return <Pie
        data={data}
    />;
}
