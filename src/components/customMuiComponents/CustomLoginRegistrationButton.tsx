import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

const LoginRegisterButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText('#7a03bf'),
    backgroundColor: '#7a03bf',
    '&:hover': {
      backgroundColor: '#59028c',
    },
    marginTop: '1rem',
  }));

export default LoginRegisterButton;