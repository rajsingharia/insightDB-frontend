import { ICharts } from "../../interfaces/ICharts";
import { FetchDataResponse } from "../../pages/addInsight/AddInsight";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import { ScatterChart } from "./ScatterChart";
import { TimeBarGraph } from "./TimeBarGraph";

type InsightChartProps = {
    insightData: FetchDataResponse;
    chartType: ICharts;
}

export const InsightChart: React.FC<InsightChartProps> = ({ insightData, chartType }) => {

    // process the data according to the chartType -> extract columns -> clean and format data
    // create the chart
    
    const chartData = insightData.data;

    if (chartType.value === 'timeBar') {
        
        let chartDataColumns: string[] = insightData.fields;
        const chartDataTimeColumn = chartDataColumns[0]; //TODO: find a way to make this dynamic
        chartDataColumns = chartDataColumns.filter((key) => key !== chartDataTimeColumn);

        return (
            <TimeBarGraph
                chartData={chartData}
                chartDataColumns={chartDataColumns}
                chartDataTimeColumn={chartDataTimeColumn}
            />
        )
    } else if (chartType.value === 'pie') {

        const chartDataColumns = insightData.fields;

        return (
            <PieChart
                chartData={chartData}
                chartDataColumns={chartDataColumns}
            />
        )
    } else if (chartType.value === 'area' || chartType.value === 'line') {
        let chartDataColumns: string[] = insightData.fields;
        const chartDataTimeColumn = chartDataColumns[0]; //TODO: find a way to make this dynamic
        chartDataColumns = chartDataColumns.filter((key) => key !== chartDataTimeColumn);

        const fill = chartType.value === 'area' ? true : false;

        return (
            <LineChart
                chartData={chartData}
                chartDataColumns={chartDataColumns}
                chartDataTimeColumn={chartDataTimeColumn}
                fill={fill} />
        )
    } else if (chartType.value === 'scatter') {
        const chartDataColumns = insightData.fields;

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
