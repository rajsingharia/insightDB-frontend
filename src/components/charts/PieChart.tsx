/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getRandomNeonColor } from '../../utils/Helper';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    chartData: unknown[];
    chartDataColumns: string[];
}

export const PieChart: React.FC<PieChartProps> = ({ chartData, chartDataColumns }) => {

    const differentBackgroundColors = getRandomNeonColor(chartDataColumns.length);
    const differentBordergroundColors = differentBackgroundColors.map((color) => color + '33');


    const datasets = [
        {
            data: chartDataColumns.map((column: any) => {
                return chartData.map((item: any) => item[column])
            }),
            backgroundColor: chartDataColumns.map(() => {
                const borderColor = differentBackgroundColors.pop();
                return borderColor + '33';
            }),
            borderColor: chartDataColumns.map(() => {
                const borderColor = differentBordergroundColors.pop();
                return borderColor;
            }),
            borderWidth: 1
        }
    ];

    const data = {
        labels: chartDataColumns,
        datasets: datasets
    }

    return <Pie
        data={data}
    />;
}
