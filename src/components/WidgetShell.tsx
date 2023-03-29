import {
  Card,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { EventBackendWithRuleLabel } from '../types';
import { types } from '@clearblade/ia-mfe';
import OpenEventIndicator from './OpenEventIndicator';

const useWidgetShellStyles = makeStyles((theme) => ({
  shell: {
    padding: theme.spacing(2),
    height: theme.spacing(38),
    width: theme.spacing(38),
  },
}));

export default function WidgetShell({
  children,
  loading,
  error,
  asset,
  onClickCharts,
  openEvents,
  overrideIcon,
}: {
  children: React.ReactNode;
  loading?: boolean;
  error?: boolean;
  asset: types.Asset['frontend'];
  onClickCharts: () => void;
  openEvents?: EventBackendWithRuleLabel[];
  overrideIcon?: JSX.Element;
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
              alignItems='center'
            >
              <Grid item>
                <IconButton size='small' onClick={onClickCharts}>
                  {overrideIcon ?? <TrendingUpIcon />}
                </IconButton>
              </Grid>
              <Grid item>
                <Typography>
                  <b>{asset?.label}</b>
                </Typography>
              </Grid>
              <Grid item>
                <OpenEventIndicator
                  openEvents={openEvents}
                  assetId={asset?.id}
                />
              </Grid>
            </Grid>
            {children}
          </Grid>
        )}
      </Card>
    </Grid>
  );
}
