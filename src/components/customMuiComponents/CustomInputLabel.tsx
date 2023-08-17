import { InputLabel, InputLabelProps, styled } from "@mui/material";


export const CustomInputLabel = styled(InputLabel)<InputLabelProps>(() => ({
    color: 'white !important', // Label text color
    '&.Mui-focused': {
        color: 'white !important', // Label text color on focus
    },
    '&.MuiInputLabel-shrink': {
        color: 'white !important', // Label text color when shrunk (value entered)
    },
}));