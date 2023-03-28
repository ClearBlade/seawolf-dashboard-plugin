import { types, utils } from '@clearblade/ia-mfe';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import ToysIcon from '@material-ui/icons/Toys';
import { useState } from 'react';
import { EventBackendWithRuleLabel } from '../types';
import PumpModal from './PumpModal';
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
  asset: types.Asset['frontend'];
  openEvents?: EventBackendWithRuleLabel[];
}) {
  const {
    data: assetTypesQuery,
    isLoading: loadingAssetTypes,
    isError: errorLoadingAssetTypes,
  } = utils.useAssetTypesCache();
  const assetType = assetTypesQuery?.DATA[asset.type];
  const classes = usePumpStyles();
  const [modalOpen, setModalOpen] = useState(false);

  // name of RPM will differ based on electric vs. diesel
  // diesel: Current Speed
  // electric: RPM
  // state attribute is different too: what I currently have works for diesel only. For electric, display green if the RPM attribute is > 0 and display grey if RPM = 0. Same logic for network connection overriding the color as red.

  // THIS COMPONENT SHOULD HAVE SWITCH AND SHOW DIFFERENT CONTENTS DEPENDING ON THE ASSET TYPE (ryan says there might be a third time that comes along so this is the best approach even if it repeats some code)

  return (
    <>
      <WidgetShell
        asset={asset}
        openEvents={openEvents}
        loading={loadingAssetTypes}
        error={errorLoadingAssetTypes}
        onClickCharts={() => setModalOpen(true)}
      >
        <Grid item container direction='column' spacing={1} alignItems='center'>
          <Grid item>
            <ToysIcon
              style={{ fontSize: '50px' }}
              className={
                !asset.custom_data['Network connection']
                  ? classes.error
                  : asset.custom_data['State']
                  ? classes.success
                  : classes.disabled
              }
            />
          </Grid>
          <PumpAttr
            label={'RPM: '}
            value={asset.custom_data['Current Speed']}
          />
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
      <PumpModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        asset={asset}
        assetType={assetType}
      />
    </>
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
