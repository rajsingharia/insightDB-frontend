export default interface IUserInsights {
    id: string;
    title: string;
    description?: string;
    integrationId: string;
    creatorId: string;
    createdAt: string;
    updatedAt: string;
    graphData: {
        chartType: string;
        // colors: string[];
        // labels: string[];
        // datasets: {
        //     label: string;
        //     data: number[];
        //     backgroundColor: string;
        //     borderColor: string;
        //     borderWidth: number;
        // }[];
        // options: {
        //     responsive: boolean;
        //     maintainAspectRatio: boolean;
        //     scales: {
        //         yAxes: {
        //             ticks: {
        //                 beginAtZero: boolean;
        //             };
        //         }[];
        //     };
        // };
    }
    parameters: JSON;
}

