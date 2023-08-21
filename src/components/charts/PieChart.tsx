/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartData
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getRandomNeonColor } from '../../utils/Helper';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    chartData: unknown[];
    chartDataColumns: string[];
}

export const PieChart: React.FC<PieChartProps> = ({ chartData, chartDataColumns }) => {

    const differentBorderColors = getRandomNeonColor(chartDataColumns.length);
    const differentBackgroundColors = differentBorderColors.map((color) => color + '33');

    const datasets = [
        {
            data: chartDataColumns.map((column: string) => {
                return chartData.map((item: any) => item[column])
            }),
            backgroundColor: chartDataColumns.map(() => {
                const borderColor = differentBackgroundColors.pop();
                return borderColor;
            }),
            borderColor: chartDataColumns.map(() => {
                const borderColor = differentBorderColors.pop();
                return borderColor;
            }),
            borderWidth: 1
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
