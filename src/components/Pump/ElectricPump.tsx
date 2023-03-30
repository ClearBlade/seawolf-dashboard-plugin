import { types } from '@clearblade/ia-mfe';
import { Grid, makeStyles } from '@material-ui/core';
import ToysIcon from '@material-ui/icons/Toys';
import PumpAttr from './PumpAttr';

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

export default function ElectricPump({
  assetType,
  asset,
}: {
  assetType: types.AssetType['frontend'];
  asset: types.Asset['frontend'];
}) {
  const classes = usePumpStyles();

  return (
    <>
      <Grid item>
        <ToysIcon
          style={{ fontSize: '50px' }}
          className={
            !asset.custom_data['Network Connection']
              ? classes.error
              : asset.custom_data['RPM'] > 0
              ? classes.success
              : classes.disabled
          }
        />
      </Grid>
      <PumpAttr label={'RPM: '} value={asset.custom_data['RPM']} />
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
    </>
  );
}
