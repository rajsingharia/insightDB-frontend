import { ICharts } from "../../interfaces/ICharts";
import { FetchDataResponse } from "../../pages/addInsight/AddInsight";
import { ChartColors } from "../../types/ChartColors";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import { ScatterChart } from "./ScatterChart";
import { TimeBarGraph } from "./TimeBarGraph";

type InsightChartProps = {
    insightData: FetchDataResponse;
    chartType: ICharts;
    chartColors: ChartColors;
}

export const InsightChart: React.FC<InsightChartProps> = ({ insightData, chartType, chartColors }) => {

    // process the data according to the chartType -> extract columns -> clean and format data
    // create the chart

    const chartData = insightData.data;
    const chartDataColumns: string[] = insightData.fields;


    if (chartType.value === 'timeBar') {
        const chartDataTimeColumn = insightData.timeField!

        return (
            <TimeBarGraph
                chartData={chartData}
                chartDataColumns={chartDataColumns}
                chartDataTimeColumn={chartDataTimeColumn}
                chartColors={chartColors}
            />
        )
    } else if (chartType.value === 'pie') {

        return (
            <PieChart
                chartData={chartData}
                chartDataColumns={chartDataColumns}
                chartColors={chartColors}
            />
        )
    } else if (chartType.value === 'area' || chartType.value === 'line') {
        const chartDataTimeColumn = insightData.timeField!

        const fill = chartType.value === 'area' ? true : false;

        return (
            <LineChart
                chartData={chartData}
                chartDataColumns={chartDataColumns}
                chartDataTimeColumn={chartDataTimeColumn}
                fill={fill}
                chartColors={chartColors}
            />
        )
    } else if (chartType.value === 'scatter') {

        return (
            <ScatterChart
                chartData={chartData}
                chartDataColumns={chartDataColumns}
                chartColors={chartColors}
            />
        )
    }

    return (
        <div>
            <h1>Insight Chart</h1>
        </div>
    )
}
