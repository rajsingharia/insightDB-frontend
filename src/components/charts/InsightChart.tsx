import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import { ScatterChart } from "./ScatterChart";
import { TimeBarGraph } from "./TimeBarGraph";

type InsightChartProps = {
    chartData: unknown[];
    chartType: { id: number, icon: string, name: string, value: string };
}

export const InsightChart: React.FC<InsightChartProps> = ({ chartData, chartType }) => {

    // process the data according to the chartType -> extract columns -> clean and format data
    // create the chart

    if (chartType.value === 'timeBar') {
        //TODO: find a way to make this dynamic (not hard coded)
        const chartDataTimeColumn = 'month';
        const chartDataColumns = Object.keys(chartData[0] as object).filter((key) => key !== chartDataTimeColumn);

        return (
            <TimeBarGraph
                chartData={chartData}
                chartDataColumns={chartDataColumns}
                chartDataTimeColumn={chartDataTimeColumn}
            />
        )
    } else if (chartType.value === 'pie') {

        const chartDataColumns = Object.keys(chartData[0] as object);

        return (
            <PieChart
                chartData={chartData}
                chartDataColumns={chartDataColumns}
            />
        )
    } else if (chartType.value === 'area' || chartType.value === 'line') {
        const chartDataTimeColumn = 'month';
        const chartDataColumns = Object.keys(chartData[0] as object).filter((key) => key !== chartDataTimeColumn);

        const fill = chartType.value === 'area' ? true : false;

        return (
            <LineChart
                chartData={chartData}
                chartDataColumns={chartDataColumns}
                chartDataTimeColumn={chartDataTimeColumn}
                fill={fill} />
        )
    } else if (chartType.value === 'scatter') {
        const chartDataColumns = Object.keys(chartData[0] as object);

        return (
            <ScatterChart
                chartData={chartData}
                chartDataColumns={chartDataColumns}
            />
        )
    }

    return (
        <div>

        </div>
    )
}
