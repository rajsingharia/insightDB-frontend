

import { Grid } from '@mui/material'
import React from 'react'
import { ICharts } from '../../interfaces/ICharts'

interface SupportedCharListProps {
    SupportedCharts: ICharts[],
    selectedChart: ICharts,
    setSelectedChart: (chart: ICharts) => void
}

export const SupportedCharList: React.FC<SupportedCharListProps> = ({ SupportedCharts, selectedChart, setSelectedChart }) => {


    return (
        // scrollable list of supported charts
        <div className='w-full'>
            <Grid container spacing={2} columns={16}>
                {
                    SupportedCharts.map((chart, index) => {
                        return (
                            <Grid item xs={8} key={index}
                                onClick={() => setSelectedChart(chart)}>
                                <div className={chart.value === selectedChart.value ?
                                    'border-4 border-purple-500 rounded bg-purple-500 bg-opacity-40' :
                                    'border-4 border-purple-500 border-opacity-30 rounded bg-black'}>
                                    <div className='flex flex-col items-center justify-center h-40 rounded shadow-md'>
                                        <img
                                            src={chart.icon}
                                            alt={chart.name}
                                            className='w-16 h-16' />
                                        <span className='text-sm font-mono font-extrabold text-white mt-5 m-3 text-center'>
                                            {chart?.name}
                                        </span>
                                    </div>
                                </div>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}
