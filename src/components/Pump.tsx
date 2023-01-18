// @ts-ignore
import * as utils from 'microfrontendUtils';
import { List, Grid, makeStyles, Typography } from '@material-ui/core';
import ToysIcon from '@material-ui/icons/Toys';
import { Skeleton } from '@material-ui/lab';
import { MockAsset, MockEventBackendWithRuleLabel } from '../mocks/types';
import OpenEventIndicator from './OpenEventIndicator';
import WidgetShell from './WidgetShell';

const usePumpStyles = makeStyles((theme) => ({
  success: {
    color: theme.palette.success.main,
  },
  disabled: {
    color: theme.palette.text.disabled,
  },
  error: {
    color: theme.palette.error.main,
  },
}));

export default function Pump({
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
  const classes = usePumpStyles();

  return (
    <WidgetShell
      asset={asset}
      openEvents={openEvents}
      loading={loadingAssetTypes}
      error={errorLoadingAssetTypes}
      onClickCharts={() => console.log('charts')}
    >
      <Grid item container direction='column' spacing={1} alignItems='center'>
        <Grid item>
          <ToysIcon
            className={
              asset.custom_data['State'] ? classes.success : classes.disabled
            }
          />
        </Grid>
        <PumpAttr label={'RPM'} value={'??'} />
        <PumpAttr
          label={'Suc:'}
          value={asset.custom_data['Suction Pressure']}
          units={
            assetType?.schema?.find(
              (attr) => attr.attribute_name === 'Suction Pressure'
            )?.custom_view_settings?.units
          }
        />
        <PumpAttr
          label={'Dis:'}
          value={asset.custom_data['Discharge Pressure']}
          units={
            assetType?.schema?.find(
              (attr) => attr.attribute_name === 'Discharge Pressure'
            )?.custom_view_settings?.units
          }
        />
        <PumpAttr
          label={'Temp:'}
          value={asset.custom_data['Temperature']}
          units={
            assetType?.schema?.find(
              (attr) => attr.attribute_name === 'Temperature'
            )?.custom_view_settings?.units
          }
        />
      </Grid>
    </WidgetShell>
  );
}

const PumpAttr = ({
  label,
  units,
  value,
}: {
  label: string;
  units?: string;
  value?: unknown;
}) => {
  if (typeof value === 'undefined') return null;
  return (
    <Grid item>
      <Typography variant='body2'>
        {label} {value}
        {units ? ` ${units}` : ''}
      </Typography>
    </Grid>
  );
};
