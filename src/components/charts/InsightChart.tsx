import { ICharts } from "../../interfaces/ICharts";
import { ChartColors, FetchDataResponse } from "../../pages/addInsight/AddInsight";
import { getRandomNeonColor } from "../../utils/Helper";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import { ScatterChart } from "./ScatterChart";
import { TimeBarGraph } from "./TimeBarGraph";

type InsightChartProps = {
    insightData: FetchDataResponse;
    chartType: ICharts;
    chartColors: ChartColors | undefined;
}

export const InsightChart: React.FC<InsightChartProps> = ({ insightData, chartType, chartColors }) => {

    // process the data according to the chartType -> extract columns -> clean and format data
    // create the chart

    const chartData = insightData.data;
    const chartDataColumns: string[] = insightData.fields;

    if(!chartColors) {
        const randomNeonColors = getRandomNeonColor(insightData?.fields?.length || 10);
        chartColors = {
            borderColor: randomNeonColors,
            backgroundColor: randomNeonColors.map((color) => color + "40")
        }
    }

    if (chartType.value === 'timeBar') {
        const chartDataTimeColumn = insightData.timeField!

        // setChartColorFields(nonTimeColumnChartDataColumns);

        return (
            <TimeBarGraph
                chartData={chartData}
                chartDataColumns={chartDataColumns}
                chartDataTimeColumn={chartDataTimeColumn}
                chartColors={chartColors}
            />
        )
    } else if (chartType.value === 'pie') {

        // setChartColorFields(chartDataColumns);

        return (
            <PieChart
                chartData={chartData}
                chartDataColumns={chartDataColumns}
                chartColors={chartColors}
            />
        )
    } else if (chartType.value === 'area' || chartType.value === 'line') {
        const chartDataTimeColumn = insightData.timeField!
        // setChartColorFields(nonTimeColumnChartDataColumns);

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

        // setChartColorFields(chartDataColumns);

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
        </div>
    )
}
