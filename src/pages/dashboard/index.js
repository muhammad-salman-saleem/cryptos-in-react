// material-ui
import { Grid, Typography, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
// mock data ui
import mining_statistics_data from '../../utils/mining_statistics_data.json';

// project import
import OrdersTable from './OrdersTable';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { useEffect, useState } from 'react';
import axios from 'axios';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentTab, setCurrentTab] = useState(0);
  const [btcPrice, setBTCPrice] = useState('0');
  const [miningDifficulty, setMiningDifficulty] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  useEffect(() => {
    const getBTC = async () => {
      try {
        const response = await axios.get('https://api.coincap.io/v2/assets/bitcoin', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_BITCOIN_API}`
          }
        });

        const BitcoinData = Number(response.data.data.priceUsd).toLocaleString();
        setBTCPrice(BitcoinData);
      } catch (error) {
        console.log('error', error);
      }
    };
    const getMiningDifficulty = async () => {
      try {
        const response = await axios.get('https://blockchain.info/q/getdifficulty');
        const mingDifficulty = Number(response.data).toExponential();
        setMiningDifficulty(mingDifficulty);
      } catch (error) {
        console.error('Error fetching mining difficulty:', error.message);
      }
    };
    getBTC();
    getMiningDifficulty();
    const intervalId = setInterval(() => {
      getBTC();
      getMiningDifficulty();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [currentTab]);

  // const getBitcoinData = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin');

  // getBitcoinData.onopen = function (event) {
  //   event.preventDefault();
  //   const apiKey = '95f5a7a1-a272-431c-85c2-613e21857070';
  //   getBitcoinData.send(JSON.stringify({ apiKey: apiKey }));
  // };
  // getBitcoinData.onmessage = function (msg) {
  //   const data = JSON.parse(msg.data);
  //   const bitcoinPrice = Number(data.bitcoin).toLocaleString();
  //   setBTCPrice(bitcoinPrice);
  // };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -1.5 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: -3.25 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{`Our Recommendation`}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="BitCoin Price USD" count={`${'$'}${btcPrice}`} percentage={59.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Mining Difficulty" count={miningDifficulty} percentage={70.5} isLoss color="warning" extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Hashrate" count={mining_statistics_data.totalHashRate} percentage={27.4} extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Active Miners"
          count={mining_statistics_data.activeMiners}
          percentage={27.4}
          isLoss
          color="warning"
          extra="$20,395"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Minning Revenue"
          count={mining_statistics_data.miningRevenue}
          percentage={27.4}
          isLoss
          color="warning"
          extra="$20,395"
        />
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Markets</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Grid item xs={12} md={12} lg={12} sx={{ ml: 2 }}>
            {' '}
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              variant={isSmallScreen ? 'scrollable' : 'standard'}
              scrollButtons="auto"
              indicatorColor="primary"
            >
              <Tab label="Favourites" />
              <Tab label="Spot Market" />
              <Tab label="ETF" />
              <Tab label="Coin-M Futures" />
            </Tabs>
            <OrdersTable currentTab={currentTab} />
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
