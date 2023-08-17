import { TextField, TextFieldProps, styled } from "@mui/material";


export const CustomTextField = styled(TextField)<TextFieldProps>(() => ({
    '& .MuiInputBase-root': {
      backgroundColor: 'black',
      color: 'white',
      borderRadius: '4px', // Adjust border radius as needed
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiFormHelperText-root': {
      color: 'gray',
    },
  }));


