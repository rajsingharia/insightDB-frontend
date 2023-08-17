/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuItem } from '@mui/material'
import { CustomTextField } from '../customMuiComponents/CustomTextField'
import { CustomInputLabel } from '../customMuiComponents/CustomInputLabel'
import { CustomSelect } from '../customMuiComponents/CustomSelect'
import { CustomFormControl } from '../customMuiComponents/CustomFormControl'

export const ChartSettings = (
    {
        selectedIntegration,
        handelSelectedIntegrationChange,
        userIntegrations,
        insightTitle,
        setInsightTitle,
        insightDescription,
        setInsightDescription,
    }: any) => {
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
        </div>
    )
}
