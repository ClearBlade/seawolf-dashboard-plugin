import { Asset } from '@clearblade/ia-mfe-core';
import { useAssetTypesCache } from '@clearblade/ia-mfe-react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import Plot from 'react-plotly.js';
import { useNavigate } from 'react-router-dom';
import { EventBackendWithRuleLabel } from '../types';
import WidgetShell from './WidgetShell';
import { useIsMobile } from '../hooks/useIsMobile';

export default function PitLevel({
  asset,
  openEvents,
}: {
  asset: Asset['frontend'];
  openEvents?: EventBackendWithRuleLabel[];
}) {
  const {
    data: assetTypesQuery,
    isLoading: loadingAssetTypes,
    isError: errorLoadingAssetTypes,
  } = useAssetTypesCache();
  const assetType = assetTypesQuery?.DATA[asset.type];

  const currFill = asset.custom_data['Level'];
  const currFillNum =
    typeof currFill === 'boolean'
      ? 0
      : typeof currFill === 'string'
      ? parseFloat(currFill)
      : (currFill as number);
  const currFillUnits = assetType?.schema?.find(
    (attr) => attr.attribute_name === 'Level'
  )?.custom_view_settings?.units;

  const maxFill = asset.custom_data['Max Fill Level'];
  const maxFillNum =
    typeof maxFill === 'boolean'
      ? 0
      : typeof maxFill === 'string'
      ? parseFloat(maxFill)
      : (maxFill as number);

  const nav = useNavigate();
  return (
    <WidgetShell
      asset={asset}
      openEvents={openEvents}
      loading={loadingAssetTypes}
      error={errorLoadingAssetTypes}
      onClickPlots={() =>
        nav(`assets/detail/${asset.id}/?tab=history&historyViewMode=Plots`)
      }
    >
      <Grid container item justifyContent='center'>
        <Grid item>
          <FillPlot currentFill={currFillNum} maxFill={maxFillNum} />
        </Grid>
      </Grid>

      <Grid container item justifyContent='center'>
        <Grid item>
          <Typography variant='body2'>
            <b>
              {currFillNum}
              {typeof currFill !== 'undefined' && currFillUnits
                ? ` ${currFillUnits}`
                : ''}
            </b>
          </Typography>
        </Grid>
      </Grid>
    </WidgetShell>
  );
}

const useFillPlotStyles = makeStyles(() => ({
  plot: { width: '100%', height: '100%' },
}));
const FillPlot = ({
  currentFill,
  maxFill,
}: {
  currentFill: number;
  maxFill: number;
}) => {
  const classes = useFillPlotStyles();
  const isMobile = useIsMobile();

  const data = [
    {
      type: 'indicator',
      mode: 'gauge',
      value: currentFill,
      gauge: {
        shape: 'bullet',
        bar: {
          color: '#afd7e6',
        },
        axis: {
          range: [null, maxFill * 1.1],
          tickvals: [currentFill, maxFill],
        }, // Add a little extra space above max
        threshold: {
          line: { color: '#8d393b', width: 2 },
          thickness: 0.75,
          value: maxFill,
        },
      },
    },
  ];

  var layout = {
    width: isMobile ? 160 : 270,
    height: 100,
    margin: {
      t: 10,
      l: 10,
      r: 10,
      b: 20,
    },
  };

  return (
    <Plot
      data={data}
      config={{ displayModeBar: false }}
      layout={layout}
      className={classes.plot}
    />
  );
};
