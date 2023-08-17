/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend);

import { getRandomNeonColor } from '../../utils/Helper';

// const data = {
//     datasets: [
//         {
//             label: 'A dataset',
//             data: Array.from({ length: 100 }, () => ({
//                 x: faker.datatype.number({ min: -100, max: 100 }),
//                 y: faker.datatype.number({ min: -100, max: 100 }),
//             })),
//             backgroundColor: 'rgba(255, 99, 132, 1)',
//         },
//     ],
// };

export const ScatterChart = ({ chartData, chartDataColumns }: any) => {

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const labels = chartDataColumns;
    console.log("Scatter Chart Labels: ", labels)
    const datasets = chartData.map((item: any) => {
        return {
            label: `(${labels[0]},${labels[1]})`,
            data: [{
                x: item[chartDataColumns[0]],
                y: item[chartDataColumns[1]]
            }],
            backgroundColor: getRandomNeonColor(1),
        }
    });

    console.log("Scatter Chart Data: ", datasets);

    const data = {
        labels,
        datasets: datasets
    }

    return (
        <Scatter
            options={options}
            data={data} />
    );
}
