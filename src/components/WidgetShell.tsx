import {
  Card,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  Tooltip,
  Theme,
} from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { EventBackendWithRuleLabel } from '../types';
import { Asset } from '@clearblade/ia-mfe-core';
import OpenEventIndicator from './OpenEventIndicator';
import BarChartIcon from '@material-ui/icons/BarChart';
import { useIsMobile } from '../hooks/useIsMobile';

const useWidgetShellStyles = makeStyles<Theme, { isMobile: boolean }>(
  (theme) => ({
    shell: ({ isMobile }) => ({
      padding: theme.spacing(2),
      height: theme.spacing(isMobile ? 40 : 40),
      width: theme.spacing(isMobile ? 20 : 35),
      display: 'flex',
    }),
  })
);

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
  asset: Asset['frontend'];
  onClickPlots: () => void;
  onClickCharts?: () => void;
  openEvents?: EventBackendWithRuleLabel[];
}) {
  const isMobile = useIsMobile();
  const classes = useWidgetShellStyles({ isMobile });
  const OpenEventIcon = (
    <Grid item>
      <Tooltip title='Go to events'>
        <OpenEventIndicator openEvents={openEvents} assetId={asset?.id} />
      </Tooltip>
    </Grid>
  );

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
            wrap='nowrap'
          >
            <Grid
              item
              container
              direction='row'
              justifyContent='space-between'
              wrap='nowrap'
              alignItems='flex-start'
            >
              {!isMobile && <Grid item></Grid>}
              <Grid item>
                <Typography>
                  <b>{asset?.label || asset?.id}</b>
                </Typography>
              </Grid>
              {!isMobile && OpenEventIcon}
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
              {isMobile && OpenEventIcon}
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
