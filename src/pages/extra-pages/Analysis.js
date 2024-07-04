import React, { useEffect, useState } from 'react';
// material-ui
import { Typography, Grid, Card, CardContent, Box } from '@mui/material';
const Analysis = () => {
  const [hashesCompleted, setHashesCompleted] = useState(0);
  const [totalBitcoinsMined, setTotalBitcoinsMined] = useState(0);
  const [expectedYieldPercentage, setExpectedYieldPercentage] = useState(0);
  const [averageHashrate, setAverageHashrate] = useState(0);

  const antminerHashrateTHs = 95.473375856321;
  const targetHashrateEHs = 10;
  const expectedBitcoinsPer10ExaHash = 7;
  const numberOfDays = 10;
  const bitcoinsMined = 1; // The actual number of bitcoins mined over 10 days

  const totalExpectedHashes = () => {
    const secondsInADay = 86400; // 24 hours  60 minutes  60 seconds
    // Calculate total hashes
    const totalHashes = antminerHashrateTHs * 1e12 * secondsInADay * numberOfDays;
    console.log(`During a 10-day period, the Antminer S1 is expected to complete approximately ${totalHashes.toExponential()} 
    hashes.`);
    return totalHashes;
  };

  const calculateMinedBitcoins = () => {
    // Convert Antminer hashRate to EH/s
    const antminerHashrateEHs = antminerHashrateTHs / 1e6;

    // Calculate the expected bitcoins mined
    const bitcoinsMined = (antminerHashrateEHs / targetHashrateEHs) * expectedBitcoinsPer10ExaHash * (numberOfDays / 10);
    console.log(`The Antminer S1 is expected to mine approximately ${bitcoinsMined} bitcoins over ${numberOfDays} days.`);
    return bitcoinsMined;
  };

  // Calculate percentage achieved
  const calculatePercentageAchieved = (bitcoinsMined, expectedBitcoins) => {
    return ((bitcoinsMined / expectedBitcoins) * 100).toFixed(2);
  };

  // Calculate expected average hashRate
  const calculateExpectedAverageHashrate = (bitcoinsMined, expectedBitcoinsPer10ExaHash, targetHashrate, numberOfDays) => {
    return ((bitcoinsMined / expectedBitcoinsPer10ExaHash) * (numberOfDays / 10) * targetHashrate * 1e6).toFixed(2);
  };

  const updateData = () => {
    const totalExpectedHashesbyAntMiner = totalExpectedHashes();
    console.log(totalExpectedHashesbyAntMiner);
    const minedBitcoins = calculateMinedBitcoins();
    console.log(minedBitcoins);
    const percentageAchieved = calculatePercentageAchieved(bitcoinsMined, expectedBitcoinsPer10ExaHash * (numberOfDays / 10));
    console.log(`Percentage of expected yield achieved: ${percentageAchieved}%`);
    const expectedAverageHashrate = calculateExpectedAverageHashrate(
      bitcoinsMined,
      expectedBitcoinsPer10ExaHash,
      targetHashrateEHs,
      numberOfDays
    );
    console.log(`Expected average hashrate over the period: ${expectedAverageHashrate} TH/s`);

    setHashesCompleted(totalExpectedHashesbyAntMiner);
    setTotalBitcoinsMined(minedBitcoins);
    setExpectedYieldPercentage(percentageAchieved);
    setAverageHashrate(expectedAverageHashrate);
  };

  useEffect(() => {
    updateData();
  });
  return (
    <Grid container rowSpacing={2.75} columnSpacing={2.75} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid item xs={12} sm={6} md={4} lg={4} sx={{ maxWidth: { sm: '300px' } }}>
        <Card
          sx={{
            maxWidth: { sm: '300px' },
            minHeight: { sm: '117px', md: '139px' },
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0px 2px 10px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
          }}
        >
          <CardContent>
            <Typography variant="h5" color="primary" component="div">
              Hashes Completed in 10 days
            </Typography>
            <Box sx={{ pt: '5px' }}>
              <Typography variant="h6" color="text.secondary">
                {hashesCompleted} Hashes
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} sx={{ maxWidth: { sm: '300px' } }}>
        <Card
          sx={{
            maxWidth: { sm: '300px' },
            minHeight: { md: '139px' },
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0px 2px 10px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
          }}
        >
          <CardContent>
            <Typography variant="h5" color="primary" component="div">
              Bitcoin won by Antminer S1 in 10 days
            </Typography>
            <Box sx={{ pt: '5px' }}>
              <Typography variant="h6" color="text.secondary">
                {totalBitcoinsMined} BTC
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} sx={{ maxWidth: { sm: '300px' } }}>
        <Card
          sx={{
            maxWidth: { sm: '300px' },
            boxShadow: '0px 2px 10px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
          }}
        >
          <CardContent>
            <Box>
              <Typography variant="h5" color="primary" component="div" sx={{ fontWeight: 'bold' }}>
                Percent of expected yield
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {expectedYieldPercentage}%
              </Typography>
            </Box>
            <Box sx={{ pt: '5px' }}>
              <Typography variant="h5" color="primary" component="div" sx={{ fontWeight: 'bold' }}>
                Miners average Hashrate
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {averageHashrate} TH/s
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Analysis;
