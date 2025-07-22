import React, { useContext } from 'react';
import { AppBar, Toolbar, Button, Box, styled } from '@mui/material';
import logo from './logo.png';
import { AccountContext } from '../constants/contexts/AccountProvider';

const HeaderContainer = styled(AppBar)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  padding: '0vh 15vh',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 99,
  backgroundColor: 'black',
  boxShadow: 'none',
});

const Logo = styled('img')({
  width: '13vh',
  userSelect: 'none',
  height: '10vh'
});

const NavigationButton = styled(Button)({
  fontSize: '1.1em',
  color: 'white',
  fontWeight: 500,
  marginLeft: '6vh',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: '-0.9vh',
    width: '100%',
    height: '0.45vh',
    background: 'white',
    borderRadius: '5px',
    transform: 'scaleX(0)',
    transition: 'transform 0.5s',
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
  },
});

const LoginButton = styled(Button)({
  width: '19.5vh',
  height: '7vh',
  background: 'transparent',
  border: '2px solid white',
  borderRadius: '6px',
  fontSize: '1.1em',
  color: 'white',
  fontWeight: 500,
  marginLeft: '6vh',
  '&:hover': {
    background: 'white',
    color: 'black',
  },
});

const RiHeader = () => {
  const { setAccount, setPerson, setPage } = useContext(AccountContext);

  const logOut = () => {
    setAccount(null);
    setPerson({});
  }

  return (
    <HeaderContainer position="static">
      <Toolbar>
        <Logo src={logo} alt="Logo" />
        <Box className="navigation">
          <NavigationButton onClick={() => setPage(1)}>Profile</NavigationButton>
          <NavigationButton onClick={() => setPage(2)}>Contests</NavigationButton>
          <NavigationButton onClick={() => setPage(3)}>Community</NavigationButton>
          <NavigationButton onClick={() => setPage(4)}>Chat</NavigationButton>
          <NavigationButton onClick={() => setPage(6)}>Problemset</NavigationButton>  {/* ← New */}
          <LoginButton onClick={logOut}>Logout</LoginButton>
        </Box>
      </Toolbar>
    </HeaderContainer>
  );
};

export default RiHeader;
