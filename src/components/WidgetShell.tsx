import {
  Card,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  // @ts-ignore
} from '@material-ui/core';
// @ts-ignore
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
// @ts-ignore
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { MockAsset, MockEventBackendWithRuleLabel } from '../mocks/types';
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
}: {
  children: React.ReactNode;
  loading?: boolean;
  error?: boolean;
  asset: MockAsset;
  onClickCharts: () => void;
  openEvents?: MockEventBackendWithRuleLabel[];
}) {
  const classes = useWidgetShellStyles();
  return (
    <Grid item>
      <Card className={classes.shell}>
        {error ? (
          <>Error</>
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
                  <TrendingUpIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography>
                  <b>{asset.label}</b>
                </Typography>
              </Grid>
              <Grid item>
                <OpenEventIndicator
                  openEvents={openEvents}
                  assetId={asset.id}
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
