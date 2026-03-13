import React from 'react';
import { Grid, Typography } from '@mui/material';
import { getWeekDays } from '../../utilities/DatetimeUtils';
import Layout from '../Reusable/Layout';

const WeeklyForecast = ({ data }) => {
  const forecastDays = getWeekDays();

  const noDataProvided =
    !data ||
    Object.keys(data).length === 0 ||
    !data.list ||
    data.list.length === 0;

  let content = (
    <div style={{ width: '100%' }}>
      <Typography
        variant="body2"
        sx={{
          color: 'rgba(255,255,255,0.7)',
          textAlign: 'center',
          padding: '2rem 0',
        }}
      >
        No forecast data available.
      </Typography>
    </div>
  );

  if (!noDataProvided)
    content = (
      <Grid container item xs={12} sx={{ width: '100%' }}>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            padding: '8px 12px',
            borderBottom: '1px solid rgba(255,255,255,0.2)',
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          <Grid item xs={3}>
            Day
          </Grid>
          <Grid item xs={3}>
            Temp
          </Grid>
          <Grid item xs={3}>
            Condition
          </Grid>
          <Grid item xs={3}>
            Humidity
          </Grid>
        </Grid>

        {data.list.map((item, idx) => (
          <Grid
            item
            xs={12}
            key={idx}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 12px',
              borderBottom:
                idx === data.list.length - 1
                  ? 'none'
                  : '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Grid item xs={3}>
              <Typography sx={{ color: 'rgba(255,255,255,0.85)' }}>
                {forecastDays[idx]}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ color: 'rgba(255,255,255,0.85)' }}>
                {Math.round(item.temp)} °C
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ color: 'rgba(255,255,255,0.85)' }}>
                {item.description}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ color: 'rgba(255,255,255,0.85)' }}>
                {item.humidity} %
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    );

  return (
    <Layout
      title="WEEKLY FORECAST"
      content={content}
      mb=".8rem"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '1rem 0 0',
      }}
    />
  );
};

export default WeeklyForecast;
