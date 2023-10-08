import React, { useEffect, useState } from 'react'
import { CustomButton } from '../customMuiComponents/CustomButton'
import AuthAxios from '../../utils/AuthAxios';
import { ICharts } from '../../interfaces/ICharts';
import { FetchDataResponse } from '../../pages/addInsight/AddInsight';
import { getRandomNeonColor } from '../../utils/Helper';
import { Save } from 'lucide-react';
import { QueryInput } from './QueryInput';
import { ChartColors } from '../../types/ChartColors';



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
    changeRefreshRate: (refreshRate: number) => void;
}

export const QueryFields: React.FC<QueryFieldsProps> = ({ integrationId, setInsightData, setSelectedChartColors, chartType, setInsightParameters, saveInsight, changeRefreshRate }) => {

    const [queryInfo, setQueryInfo] = useState<QueryInfoResponse>({} as QueryInfoResponse);
    const [refreshRate, setRefreshRate] = useState<number>(0);

    useEffect(() => {
        const authAxios = AuthAxios.getAuthAxios();
        authAxios.get(`/charts/queries/${chartType.id}`)
            .then((res) => {
                console.log("Query Info: ", res.data);
                setQueryInfo(res.data);
                setInsightData(undefined);
            })
            .catch((err) => {
                console.log(err)
            });

    }, [chartType, setInsightData]);

    const getInsightData = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const authAxios = AuthAxios.getAuthAxios();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parameters: any = {};

        queryInfo.queryInfo.forEach((queryInfo) => {

            const type = queryInfo.parameterType;
            const value = event.currentTarget[queryInfo.parameterName].value;

            if (value !== '') {
                if (type === 'string' || type === 'number') {
                    parameters[queryInfo.parameterName as string] = value;
                } else if (type == 'string[]') {
                    parameters[queryInfo.parameterName as string] = value.split(',').map((val: string) => val.trim());
                }
            }
        });

        const body = {
            integrationId: integrationId,
            parameters: parameters
        }

        authAxios.post('/fetchData', body)
            .then((res) => {
                console.log("Data: ", res.data.data);
                const fetchedData = res.data as FetchDataResponse;

                const fieldsCount = fetchedData.countOfFields;
                if (fieldsCount) {
                    const borderColors = getRandomNeonColor(Number(fieldsCount));
                    let backgroundColors = borderColors;
                    backgroundColors = backgroundColors.map((color) => color + '40');
                    if (backgroundColors.length > 0 && borderColors.length > 0) {
                        const chartColors = new ChartColors(
                            backgroundColors,
                            borderColors
                        )
                        console.log("Setting chart colors: ", chartColors);
                        setSelectedChartColors(chartColors);
                    }
                }

                setInsightData(fetchedData);
                setInsightParameters(parameters);
                changeRefreshRate(refreshRate);

            })
            .catch((err) => {
                console.log(err)
            });

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
