import { styled, Select, SelectProps } from "@mui/material";


export const CustomSelect = styled(Select)<SelectProps>(() => ({
  '&.MuiInputBase-root': {
    backgroundColor: 'black', // Input background color
    color: 'white', // Input text color
    borderRadius: '4px', // Adjust border radius as needed
  },
}));
