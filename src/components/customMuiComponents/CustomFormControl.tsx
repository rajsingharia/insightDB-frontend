import { styled, FormControl, FormControlProps } from "@mui/material";

export const CustomFormControl = styled(FormControl)<FormControlProps>(() => ({
    '&.MuiFormControl-root': {
        backgroundColor: 'black !important', // Background color
        '& fieldset': {
            borderColor: 'white !important', // Border color
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white !important', // Border color on focus
        },
    },
}));
