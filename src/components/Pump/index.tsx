import { types, utils } from '@clearblade/ia-mfe';
import { Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import {
  DieselPumpTypeId,
  ElectricPumpTypeId,
} from '../../constants.ts/typeNames';
import { EventBackendWithRuleLabel } from '../../types';
import PumpModal from '../PumpModal';
import WidgetShell from '../WidgetShell';
import DieselPump from './DieselPump';
import ElectricPump from './ElectricPump';
import BarChartIcon from '@material-ui/icons/BarChart';

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
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <WidgetShell
        asset={asset}
        openEvents={openEvents}
        loading={loadingAssetTypes}
        error={errorLoadingAssetTypes}
        onClickCharts={() => setModalOpen(true)}
        overrideIcon={<BarChartIcon />}
      >
        <Grid item container direction='column' spacing={1} alignItems='center'>
          {assetType?.id === DieselPumpTypeId && (
            <DieselPump assetType={assetType} asset={asset} />
          )}
          {assetType?.id === ElectricPumpTypeId && (
            <ElectricPump assetType={assetType} asset={asset} />
          )}
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
