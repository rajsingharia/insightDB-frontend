import React, { useEffect, useState } from 'react'
import IUserInsights from '../../interfaces/IUserInsights';
import { InsightChart } from '../charts/InsightChart';
import AuthAxios from '../../utils/AuthAxios';
import { CircularProgress } from '@mui/material';
import { ICharts } from '../../interfaces/ICharts';
import { FetchDataResponse } from '../../pages/addInsight/AddInsight';
//Different for prod and dev environment
//import { BASE_URL } from '../../utils/Constants';
import AuthEventSource from '../../utils/AuthEventSource';

type UserInsightCardProps = {
    insight: IUserInsights;
}

export const UserInsightCard: React.FC<UserInsightCardProps> = ({ insight }) => {


    //TODO: Add a refresh button to refresh the data
    //TODO: Convert it into Atom (to share the states between the cards)

    const [chartData, setChartData] = useState<FetchDataResponse | undefined>(undefined);
    const [chartType, setChartType] = useState<ICharts>({} as ICharts);
    const [error, setError] = useState<string>('');

    useEffect(() => {

        const authAxios = AuthAxios.getAuthAxios();

        const body = {
            integrationId: insight.integrationId,
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
            });

        const chartType = insight.graphData.chartType;

        authAxios.get(`/charts/chart-details/${chartType}`)
            .then((res) => {
                setChartType(res.data);
            })
            .catch((err) => {
                console.log(err)
            });


        const refreshRate = insight.refreshRate;

        if (refreshRate > 0) {
            makeSSEConnection();
        }

    }, [insight]);

    const makeSSEConnection = () => {

        console.log("Making SSE Connection");

        const eventSource = AuthEventSource.getAuthEventSource(insight.id);

        eventSource.onopen = () => console.log("SSE Connection Opened");

        eventSource.onmessage = (event) => {
            console.log("SSE: ", event.data);
            setChartData(JSON.parse(event.data));
        }

        eventSource.onerror = (event) => {
            if (eventSource.readyState === 0) {
                console.log("SSE Connection Closed");
                eventSource.close();
            } else {
                console.log("SSE Error: ", event);
            }
        }

        //to close the connection when the component unmounts or rerenders
        // eventSource.close();

    }

    const chartColors = insight?.graphData?.chartColors;

    return (
        <div className="flex flex-col justify-center items-center h-full w-full border-purple-500 border-2 rounded px-4 py-2 bg-purple-500 bg-opacity-0 hover:bg-opacity-10">
            {
                chartData && chartType && chartColors ?
                    <div className="flex flex-col justify-between items-center w-full">
                        <h4 className="text-l font-bold font-mono text-white">{insight.title}</h4>
                        <InsightChart
                            insightData={chartData}
                            chartType={chartType}
                            chartColors={chartColors}
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
