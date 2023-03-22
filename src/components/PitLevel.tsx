// @ts-ignore
import * as utils from '@ia/mfe';
// @ts-ignore
import { Grid, makeStyles, Typography } from '@material-ui/core';
import Plot from 'react-plotly.js';
// @ts-ignore
import { useNavigate } from 'react-router-dom';
import { MockAsset, MockEventBackendWithRuleLabel } from '../mocks/types';
import WidgetShell from './WidgetShell';

export default function PitLevel({
  asset,
  openEvents,
}: {
  asset: MockAsset;
  openEvents?: MockEventBackendWithRuleLabel[];
}) {
  const {
    data: assetTypesQuery,
    isLoading: loadingAssetTypes,
    isError: errorLoadingAssetTypes,
  } = utils.useAssetTypesCache();
  const assetType = assetTypesQuery?.DATA[asset.type];

  const currFill = asset.custom_data['Fill Level'];
  const currFillUnits = assetType?.schema?.find(
    (attr) => attr.attribute_name === 'Fill Level'
  )?.custom_view_settings?.units;

  const maxFill = asset.custom_data['Max Fill Level'];

  const nav = useNavigate();

  return (
    <WidgetShell
      asset={asset}
      openEvents={openEvents}
      loading={loadingAssetTypes}
      error={errorLoadingAssetTypes}
      onClickCharts={() =>
        nav(`assets/detail/${asset.id}/?tab=history&historyViewMode=Plots`)
      }
    >
      <Grid container item justifyContent='center'>
        <Grid item>
          <FillPlot
            currentFill={currFill as number} // COME BACK TO THIS ASSERTION WHEN WE HAVE TYPES IMPORTED
            maxFill={maxFill as number}
          />
        </Grid>
      </Grid>

      <Grid container item justifyContent='center'>
        <Grid item>
          <Typography variant='body2'>
            <b>
              {currFill}
              {currFillUnits ? ` ${currFillUnits}` : ''}
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
    width: 280,
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
