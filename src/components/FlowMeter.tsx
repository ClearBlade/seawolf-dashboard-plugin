// @ts-ignore
import * as utils from 'microfrontendUtils';
import React from 'react';
import { MockAsset, MockEventBackendWithRuleLabel } from '../mocks/types';
import WidgetShell from './WidgetShell';
import OpenEventIndicator from './OpenEventIndicator';
import WavesIcon from '@material-ui/icons/Waves';
import { Grid, Typography } from '@material-ui/core';

export default function FlowMeter({
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

  console.log('asset', asset);
  return (
    <WidgetShell
      asset={asset}
      openEvents={openEvents}
      onClickCharts={() => console.log('charts')}
    >
      <Grid item container direction='column' spacing={1} alignItems='center'>
        <Grid item>
          <WavesIcon style={{ fontSize: '50px' }} />
        </Grid>
        <FlowAttr
          value={asset.custom_data['Rate']}
          units={
            assetType?.schema?.find((attr) => attr.attribute_name === 'Rate')
              ?.custom_view_settings?.units
          }
        />
        <FlowAttr
          value={asset.custom_data['Total Barrels']}
          units={
            assetType?.schema?.find(
              (attr) => attr.attribute_name === 'Total Barrels'
            )?.custom_view_settings?.units
          }
        />
      </Grid>
    </WidgetShell>
  );
}

const FlowAttr = ({ units, value }: { units?: string; value?: unknown }) => {
  if (typeof value === 'undefined') return null;
  return (
    <Grid item>
      <Typography variant='body2'>
        {value}
        {units ? ` ${units}` : ''}
      </Typography>
    </Grid>
  );
};
