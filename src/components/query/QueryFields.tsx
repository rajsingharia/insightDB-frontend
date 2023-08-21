import React, { useEffect } from 'react'
import { CustomButton } from '../customMuiComponents/CustomButton'
import AuthAxios from '../../utils/AuthAxios';
import { CustomTextField } from '../customMuiComponents/CustomTextField';
import { ICharts } from '../../interfaces/ICharts';
import { FetchDataResponse } from '../../pages/addInsight/AddInsight';



type QueryInfo = {
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
    chartType: ICharts;
    setInsightParameters: React.Dispatch<React.SetStateAction<JSON>>;
}

export const QueryFields: React.FC<QueryFieldsProps> = ({ integrationId, setInsightData, chartType, setInsightParameters }) => {

    const [queryInfo, setQueryInfo] = React.useState<QueryInfoResponse>({} as QueryInfoResponse);

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
            if(!(type == 'string' || type == 'string[]')) {
                type = JSON.parse(type);
            }
            
            const value = event.currentTarget[queryInfo.parameterName].value;

            if (value !== '') {
                if (type === 'string') {
                    parameters[queryInfo.parameterName as string] = value;
                } else if( type == 'string[]') {
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
                setInsightData(res.data);
                setInsightParameters(parameters);
            })
            .catch((err) => {
                console.log(err)
            });
    }


    return (
        // make it scrollable
        <div className="flex flex-col justify-start items-start w-full p-3 overflow-y-auto">
            <form
                className="flex flex-col justify-start items-end text-white w-full gap-3"
                onSubmit={getInsightData}>
                {
                    queryInfo.count > 0 && queryInfo.queryInfo &&
                    queryInfo.queryInfo.map((queryInfo) => {
                        return (
                            <CustomTextField
                                key={queryInfo.parameterName}
                                id={queryInfo.parameterName}
                                fullWidth
                                size="small"
                                label={queryInfo.parameterName}
                                defaultValue={queryInfo.parameterDefault || ''}
                                required={queryInfo.parameterRequired || false}
                                helperText={queryInfo.parameterHelperText || ''}
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
    )
}
