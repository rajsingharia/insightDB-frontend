import React, { useEffect, useState } from 'react'
import IUserInsights from '../../interfaces/IUserInsights';
import { InsightChart } from '../charts/InsightChart';
import AuthAxios from '../../utils/AuthAxios';
import { CircularProgress } from '@mui/material';
import { ICharts } from '../../interfaces/ICharts';
import { FetchDataResponse } from '../../pages/addInsight/AddInsight';

type UserInsightCardProps = {
    insight: IUserInsights;
}

export const UserInsightCard: React.FC<UserInsightCardProps> = ({ insight }) => {

    const [chartData, setChartData] = useState<FetchDataResponse | undefined>(undefined);
    const [chartType, setChartType] = useState<ICharts>({} as ICharts);
    const [error, setError] = useState<string>('');

    useEffect(() => {

        const authAxios = AuthAxios.getAuthAxios();

        const body = {
            integrationId: insight.inetgrationId,
            parameters: insight.parameters
        }

        authAxios.post('/fetchData', body)
            .then((res) => {
                console.log("Data: ", res.data.data);
                setChartData(res.data);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            })

        const chartType = insight.graphData.chartType;

        authAxios.get(`/charts/chart-details/${chartType}`)
            .then((res) => {
                setChartType(res.data);
            })
            .catch((err) => {
                console.log(err)
            });

    }, [insight])

    return (
        <div className="flex flex-col justify-center items-center h-full w-full border-purple-500 border-2 rounded px-4 py-2 bg-purple-500 bg-opacity-0 hover:bg-opacity-10">
            {
                chartData && chartType ?
                    <div className="flex flex-col justify-between items-center w-full">
                        <h4 className="text-l font-bold font-mono text-white">{insight.title}</h4>
                        <InsightChart
                            insightData={chartData}
                            chartType={chartType}
                            chartColors={insight?.graphData?.chartColors}
                        />
                    </div>
                    :
                    <div className="flex flex-col justify-between items-center w-full">
                        <h4 className="text-l font-bold font-mono text-white">{insight.title}</h4>
                        {
                            error ?
                                <p className="font-mono text-red-500">{error}</p>
                                :
                                <CircularProgress
                                    color="secondary"
                                    size={30}
                                    className="mx-2"
                                />
                        }
                    </div>
            }
        </div>
    )
}
