
import React from 'react'
import { QueryInfo } from './QueryFields';
import { CustomTextField } from '../customMuiComponents/CustomTextField';

type QueryInputProps = {
    queryInfo: QueryInfo;
}

export const QueryInput: React.FC<QueryInputProps> = ({ queryInfo }) => {
    return (
        <div className="w-full">
            {
                // queryInfo.parameterType === "string[]" ?
                //     <CustomTextField
                //         id={queryInfo.parameterName}
                //         type={queryInfo.parameterType}
                //         fullWidth
                //         size="small"
                //         label={queryInfo.parameterName}
                //         defaultValue={queryInfo.parameterDefault || ''}
                //         required={queryInfo.parameterRequired || false}
                //         helperText={queryInfo.parameterHelperText || ''}
                //     />
                //     :
                    <CustomTextField
                        id={queryInfo.parameterName}
                        type={queryInfo.parameterType}
                        fullWidth
                        size="small"
                        label={queryInfo.parameterName}
                        defaultValue={queryInfo.parameterDefault || ''}
                        required={queryInfo.parameterRequired || false}
                        // helperText={queryInfo.parameterHelperText || ''}
                    />
            }
        </div>
    )
}
