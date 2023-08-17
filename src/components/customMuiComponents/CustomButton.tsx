import { Button, ButtonProps, styled } from "@mui/material";
import { purple } from "@mui/material/colors";


export const CustomButton = styled(Button)<ButtonProps>(() => ({
    color: '#fff',
    backgroundColor: '#7d12ff',
    '&:hover': {
        backgroundColor: purple[700],
    },
}));