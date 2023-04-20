import { Asset } from '@clearblade/ia-mfe-core';
import { useAssetTypesCache } from '@clearblade/ia-mfe-react';
import { Grid, Typography } from '@material-ui/core';
import WavesIcon from '@material-ui/icons/Waves';
import { useNavigate } from 'react-router-dom';
import { EventBackendWithRuleLabel } from '../types/index';
import WidgetShell from './WidgetShell';
import { useIsMobile } from '../hooks/useIsMobile';

export default function FlowMeter({
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

  const nav = useNavigate();
  const isMobile = useIsMobile();

  return (
    <WidgetShell
      asset={asset}
      loading={loadingAssetTypes}
      error={errorLoadingAssetTypes}
      openEvents={openEvents}
      onClickPlots={() =>
        nav(`assets/detail/${asset.id}/?tab=history&historyViewMode=Plots`)
      }
    >
      <Grid item container direction='column' spacing={1} alignItems='center'>
        <Grid item>
          <WavesIcon style={{ fontSize: isMobile ? '25px' : '50px' }} />
        </Grid>
        <FlowAttr
          value={asset.custom_data['Rate']}
          units={
            assetType?.schema?.find((attr) => attr.attribute_name === 'Rate')
              ?.custom_view_settings?.units as string | number | undefined
          }
        />
        <FlowAttr
          value={asset.custom_data['Total Barrels']}
          units={
            assetType?.schema?.find(
              (attr) => attr.attribute_name === 'Total Barrels'
            )?.custom_view_settings?.units as string | number | undefined
          }
        />
      </Grid>
    </WidgetShell>
  );
}

const FlowAttr = ({
  units,
  value,
}: {
  units?: string | number;
  value?: unknown;
}) => {
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
