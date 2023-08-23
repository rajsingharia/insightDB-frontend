import React, { useEffect, useState } from 'react'
import { CustomButton } from '../customMuiComponents/CustomButton'
import AuthAxios from '../../utils/AuthAxios';
import { ICharts } from '../../interfaces/ICharts';
import { ChartColors, FetchDataResponse } from '../../pages/addInsight/AddInsight';
import { getRandomNeonColor } from '../../utils/Helper';
import { Save } from 'lucide-react';
import { QueryInput } from './QueryInput';



export type QueryInfo = {
    parameterName: string;
    parameterType: string;
    parameterRequired: boolean;
    parameterDefault?: string;
    parameterHelperText?: string;
}

type QueryInfoResponse = {
    count: number;
    queryInfo: QueryInfo[];
}


interface QueryFieldsProps {
    integrationId: string;
    setInsightData: React.Dispatch<React.SetStateAction<FetchDataResponse | undefined>>;
    setSelectedChartColors: React.Dispatch<React.SetStateAction<ChartColors | undefined>>;
    chartType: ICharts;
    setInsightParameters: React.Dispatch<React.SetStateAction<JSON>>;
    saveInsight: (event: unknown) => void;
}

export const QueryFields: React.FC<QueryFieldsProps> = ({ integrationId, setInsightData, setSelectedChartColors, chartType, setInsightParameters, saveInsight }) => {

    const [queryInfo, setQueryInfo] = useState<QueryInfoResponse>({} as QueryInfoResponse);
    const [refreshRate, setRefreshRate] = useState<number>(0);

    useEffect(() => {
        const authAxios = AuthAxios.getAuthAxios();
        authAxios.get(`/charts/queries/${chartType.id}`)
            .then((res) => {
                console.log("Query Info: ", res.data);
                setQueryInfo(res.data);
                setInsightData(undefined);
                setInsightParameters({} as JSON);
            })
            .catch((err) => {
                console.log(err)
            });

    }, [chartType]);

    const getInsightData = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const authAxios = AuthAxios.getAuthAxios();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parameters: any = {};

        queryInfo.queryInfo.forEach((queryInfo) => {

            let type = queryInfo.parameterType;
            if (!(type == 'string' || type === 'number' || type == 'string[]')) {
                type = JSON.parse(type);
            }

            const value = event.currentTarget[queryInfo.parameterName].value;

            if (value !== '') {
                if (type === 'string' || type === 'number') {
                    parameters[queryInfo.parameterName as string] = value;
                } else if (type == 'string[]') {
                    parameters[queryInfo.parameterName as string] = value.split(',').map((val: string) => val.trim());
                }
            }
        });

        parameters['refreshRate'] = refreshRate;

        const body = {
            integrationId: integrationId,
            parameters: parameters
        }

        console.log("Body: ", body);

        const fetchInsightData = () => {
            authAxios.post('/fetchData', body)
                .then((res) => {
                    console.log("Data: ", res.data.data);
                    setInsightData(res.data);
                    setInsightParameters(parameters);
                    const fieldsCount = res.data.countOfFields;
                    if (fieldsCount) {

                        const borderColors = getRandomNeonColor(fieldsCount);
                        const backgroundColors = borderColors.map((color) => color + '40');

                        const chartColors: ChartColors = {
                            backgroundColor: backgroundColors,
                            borderColor: borderColors
                        }

                        setSelectedChartColors(chartColors);

                    }
                })
                .catch((err) => {
                    console.log(err)
                });
        }

        fetchInsightData();

        // TODO: This is a hacky way to refresh the data. Need to find a better way to do this.
        // TODO: Better way to do this is to use SSE (Server Sent Events) to push the data to the client.
        // const refreshRateInMs = refreshRate * 1000;
        // if (refreshRateInMs > 0) {
        //     setInterval(() => {
        //         fetchInsightData();
        //     }, refreshRateInMs);
        // }

    }


    return (
        <div className="flex flex-col h-full w-full gap-2">
            {
                <div className="flex flex-row justify-end items-center w-full gap-2 h-10">
                    <div className="text-white font-mono text-sm">Refresh Rate (in seconds):</div>
                    <div className="border-2 border-purple-500 rounded px-3 py-1 bg-purple-500 cursor-pointer bg-opacity-30">
                        <input
                            type="number"
                            className="bg-transparent text-white outline-none w-20 text-center h-full"
                            value={refreshRate}
                            onChange={(e) => setRefreshRate(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="border-2 border-purple-500 rounded px-3 py-1 bg-purple-500 cursor-pointer bg-opacity-30"
                        onClick={saveInsight}>
                        <Save color="white" />
                    </div>
                </div>
            }
            <div className="flex flex-col justify-start items-start p-2 w-full overflow-y-auto">
                <form
                    className="flex flex-col justify-start items-end text-white w-full gap-2"
                    onSubmit={getInsightData}>
                    {
                        queryInfo.count > 0 && queryInfo.queryInfo &&
                        queryInfo.queryInfo.map((queryInfo) => {
                            return (
                                <QueryInput
                                    key={queryInfo.parameterName}
                                    queryInfo={queryInfo}
                                />
                            )
                        })
                    }
                    <CustomButton
                        variant="outlined"
                        type="submit">
                        Get Data
                    </CustomButton>
                </form>
            </div>
        </div>
    )
}
