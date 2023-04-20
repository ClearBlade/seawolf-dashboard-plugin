import { AssetType, Asset } from '@clearblade/ia-mfe-core';
import { Grid, makeStyles } from '@material-ui/core';
import ToysIcon from '@material-ui/icons/Toys';
import PumpAttr from './PumpAttr';
import { useIsMobile } from '../../hooks/useIsMobile';

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

export default function DieselPump({
  assetType,
  asset,
}: {
  assetType: AssetType['frontend'];
  asset: Asset['frontend'];
}) {
  const isMobile = useIsMobile();
  const classes = usePumpStyles();
  return (
    <>
      <Grid item>
        <ToysIcon
          style={{ fontSize: isMobile ? '25px' : '50px' }}
          className={
            !asset.custom_data['Network Connection']
              ? classes.error
              : asset.custom_data['State']
              ? classes.success
              : classes.disabled
          }
        />
      </Grid>
      <PumpAttr label={'RPM: '} value={asset.custom_data['Current Speed']} />
      <PumpAttr
        label={'Suc:'}
        value={asset.custom_data['Suction Pressure']}
        units={
          assetType?.schema?.find(
            (attr) => attr.attribute_name === 'Suction Pressure'
          )?.custom_view_settings?.units as string | number
        }
      />
      <PumpAttr
        label={'Dis:'}
        value={asset.custom_data['Discharge Pressure']}
        units={
          assetType?.schema?.find(
            (attr) => attr.attribute_name === 'Discharge Pressure'
          )?.custom_view_settings?.units as string | number
        }
      />
      <PumpAttr
        label={'Temp:'}
        value={asset.custom_data['Temperature']}
        units={
          assetType?.schema?.find(
            (attr) => attr.attribute_name === 'Temperature'
          )?.custom_view_settings?.units as string | number
        }
      />
      <PumpAttr
        label={'Battery:'}
        value={asset.custom_data['Battery']}
        units={
          assetType?.schema?.find((attr) => attr.attribute_name === 'Battery')
            ?.custom_view_settings?.units as string | number
        }
      />
    </>
  );
}
