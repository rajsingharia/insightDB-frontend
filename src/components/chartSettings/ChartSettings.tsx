/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuItem, SelectChangeEvent } from '@mui/material'
import { CustomTextField } from '../customMuiComponents/CustomTextField'
import { CustomInputLabel } from '../customMuiComponents/CustomInputLabel'
import { CustomSelect } from '../customMuiComponents/CustomSelect'
import { CustomFormControl } from '../customMuiComponents/CustomFormControl'
import { ChartColors, userIntegrationResponse } from '../../pages/addInsight/AddInsight'
import { getRandomNeonColor } from '../../utils/Helper'


interface ChartSettingsProps {
    selectedIntegration: userIntegrationResponse | undefined,
    handelSelectedIntegrationChange: (event: any) => void,
    userIntegrations: userIntegrationResponse[],
    insightTitle: string,
    setInsightTitle: React.Dispatch<React.SetStateAction<string>>,
    insightDescription: string,
    setInsightDescription: React.Dispatch<React.SetStateAction<string>>
}




export const ChartSettings: React.FC<ChartSettingsProps> = (
    {
        selectedIntegration,
        handelSelectedIntegrationChange,
        userIntegrations,
        insightTitle,
        setInsightTitle,
        insightDescription,
        setInsightDescription,
    }) => {


    // if (chartType === 'timeBar' || chartType === 'line' || chartType === 'area') {
    //     fields?.slice(1);
    // }

    // const handelColorChange = (index: number) => {

    //     const newBorderColor: string = getRandomNeonColor(1)[0];
    //     const newBackgroundColor: string = newBorderColor + '40';

    //     const newSelectedChartColors = selectedChartColors;
    //     if (newSelectedChartColors) {

    //         newSelectedChartColors.borderColor[index] = newBorderColor;
    //         newSelectedChartColors.backgroundColor[index] = newBackgroundColor;
    //     }

    //     setSelectedChartColors(newSelectedChartColors);
    // }


    return (
        <div className="flex flex-col justify-start items-start w-full mt-2 gap-3">
            <CustomFormControl
                fullWidth
                size="small">
                <CustomInputLabel id="integration-select-label">Select Integration</CustomInputLabel>
                <CustomSelect
                    labelId="integration-select-label"
                    id="integration-select"
                    value={selectedIntegration?.id || ''}
                    label="Select Integration"
                    onChange={handelSelectedIntegrationChange}>
                    {
                        userIntegrations &&
                        userIntegrations.map((integration: any) => {
                            return (
                                <MenuItem
                                    value={integration?.id}
                                    key={integration?.id}>
                                    {integration?.name}
                                </MenuItem>
                            )
                        })
                    }
                </CustomSelect>
            </CustomFormControl>
            <CustomTextField
                fullWidth
                size="small"
                label="Chart Title"
                value={insightTitle}
                onChange={(event) => setInsightTitle(event.target.value)}
            />
            <CustomTextField
                fullWidth
                size="small"
                label="Chart Description"
                value={insightDescription}
                onChange={(event) => setInsightDescription(event.target.value)}
            />
            {/* {
                fields && selectedChartColors &&
                <div className="flex flex-col justify-start items-center w-full gap-3">
                    {
                        fields.map((field, index) => {
                            return (
                                <div
                                    key={field}
                                    className="flex flex-row justify-start items-center gap-2">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        onClick={() => handelColorChange(index)}
                                        style={{
                                            backgroundColor: selectedChartColors?.backgroundColor.pop(),
                                            border: `2px solid ${selectedChartColors?.borderColor.pop()}`
                                        }} />
                                    <p>{field}</p>
                                </div>
                            )
                        })
                    }
                </div>
            } */}
        </div>
    )
}
