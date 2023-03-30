import {
  Card,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  Tooltip,
} from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { EventBackendWithRuleLabel } from '../types';
import { types } from '@clearblade/ia-mfe';
import OpenEventIndicator from './OpenEventIndicator';
import BarChartIcon from '@material-ui/icons/BarChart';

const useWidgetShellStyles = makeStyles((theme) => ({
  shell: {
    padding: theme.spacing(2),
    height: theme.spacing(38),
    width: theme.spacing(38),
    display: 'flex',
  },
}));

export default function WidgetShell({
  children,
  loading,
  error,
  asset,
  onClickPlots,
  onClickCharts,
  openEvents,
}: {
  children: React.ReactNode;
  loading?: boolean;
  error?: boolean;
  asset: types.Asset['frontend'];
  onClickPlots: () => void;
  onClickCharts?: () => void;
  openEvents?: EventBackendWithRuleLabel[];
}) {
  const classes = useWidgetShellStyles();
  return (
    <Grid item>
      <Card className={classes.shell}>
        {error ? (
          <Grid container>
            <Grid item>Error</Grid>
          </Grid>
        ) : loading ? (
          <Skeleton />
        ) : (
          <Grid
            container
            direction='column'
            justifyContent='space-between'
            spacing={2}
          >
            <Grid
              item
              container
              direction='row'
              justifyContent='space-between'
              wrap='nowrap'
              alignItems='flex-start'
            >
              <Grid item></Grid>
              <Grid item>
                <Typography>
                  <b>{asset?.label || asset?.id}</b>
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='Go to events'>
                  <OpenEventIndicator
                    openEvents={openEvents}
                    assetId={asset?.id}
                  />
                </Tooltip>
              </Grid>
            </Grid>

            {children}

            <Grid
              item
              container
              direction='row'
              justifyContent='space-between'
              alignItems='flex-end'
              style={{ flex: 1 }}
            >
              <Grid item>
                <Tooltip title='Go to plots'>
                  <IconButton size='small' onClick={onClickPlots}>
                    <TrendingUpIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                {onClickCharts && (
                  <Tooltip title='View details'>
                    <IconButton size='small' onClick={onClickCharts}>
                      <BarChartIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Card>
    </Grid>
  );
}
