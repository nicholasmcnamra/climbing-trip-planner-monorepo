import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Box } from '@mui/material';
import AreaSearch from './Components/AreaSearch';
import Navbar from './Components/Navbar';
import TripPlanner from './Components/TripPlannerSections/TripPlanner';
import { TripProvider } from './Context/TripContext';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import '@fontsource/ubuntu-mono';

export const apolloClient = new ApolloClient({
  uri: 'https://stg-api.openbeta.io',
  cache: new InMemoryCache(),
});

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Ubuntu Mono"',
    ].join(','),
  },
    palette: {
      primary: {
        light: '#ffd453',
        main: '#ffca28',
        dark: '#b28d1c',

      },
      secondary: {
        light: '#535da8',
        main: '#283593',
        dark: '#1c2566',
      },
  },
});

function App() {
  return (
    <TripProvider>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
        <Box className="App">
          <Navbar></Navbar>
            <Router>
              <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path="/start-planning" element={<AreaSearch/>}/>
                <Route path="trip-planner" element={<TripPlanner/>}></Route>
              </Routes>
            </Router>
        </Box>
        </ThemeProvider>
      </ApolloProvider>
    </TripProvider>
  );
}

export default App;
