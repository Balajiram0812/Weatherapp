import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { getDayMonthFromDate } from '../../../utilities/DatetimeUtils';
import { weatherIcon } from '../../../utilities/IconsUtils';
import ErrorBox from '../../Reusable/ErrorBox';
import AirConditionsItem from '../AirConditions/AirConditionsItem';
import CityDateDetail from './CityDateDetail';

import WeatherIconDetail from './WeatherIconDetail';
import Layout from '../../Reusable/Layout';

const dayMonth = getDayMonthFromDate();

const Details = ({ data }) => {
  const noDataProvided =
    !data || Object.keys(data).length === 0 || data.cod === '404';

  let content = <ErrorBox flex="1" type="error" />;

  if (!noDataProvided)
    content = (
      <>
        {/* First Row: City and Icon */}
        <Grid container item xs={12} sx={{ marginBottom: '2rem' }}>
          <Grid item xs={6}>
            <CityDateDetail city={data.city} date={dayMonth} />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <WeatherIconDetail src={weatherIcon(`${data.weather[0].icon}.png`)} />
          </Grid>
        </Grid>

        {/* Second Row: Detailed Metrics */}
        <Grid
          container
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '1rem',
            marginTop: '1rem',
          }}
        >
          <Grid item xs={2.4} sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: { xs: '10px', sm: '12px' },
                marginBottom: '8px',
                textTransform: 'uppercase',
                fontFamily: 'Roboto Condensed',
              }}
            >
              Weather
            </Typography>
            <Typography
              sx={{
                color: 'white',
                fontWeight: '600',
                fontSize: { xs: '12px', sm: '16px' },
                fontFamily: 'Poppins',
              }}
            >
              {Math.round(data.main.temp)} °C
            </Typography>
          </Grid>
          <AirConditionsItem
            xs={2.4}
            title="Real Feel"
            value={`${Math.round(data.main.feels_like)} °C`}
            type="temperature"
          />
          <AirConditionsItem
            xs={2.4}
            title="Humidity"
            value={`${Math.round(data.main.humidity)} %`}
            type="humidity"
          />
          <AirConditionsItem
            xs={2.4}
            title="Wind"
            value={`${data.wind.speed} m/s`}
            type="wind"
          />
          <AirConditionsItem
            xs={2.4}
            title="Clouds"
            value={`${Math.round(data.clouds.all)} %`}
            type="clouds"
          />
        </Grid>
      </>
    );

  return <Layout title="CURRENT WEATHER" content={content} />;
};

export default Details;
