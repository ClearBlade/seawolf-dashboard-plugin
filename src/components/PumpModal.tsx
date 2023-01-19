// @ts-ignore
import * as utils from 'microfrontendUtils';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { MockAsset, MockAssetType } from '../mocks/types';
import CloseIcon from '@material-ui/icons/Close';
import { v4 as uuid } from 'uuid';
import { useSnackbar } from 'notistack';

const usePumpModalStyles = makeStyles((theme) => ({
  success: {
    color: theme.palette.success.main,
  },
  disabled: {
    color: theme.palette.text.disabled,
  },
  controlFooter: {
    padding: theme.spacing(2),
  },
}));

export default function PumpModal({
  open,
  onClose,
  asset,
  assetType,
}: {
  open: boolean;
  onClose: () => void;
  asset: MockAsset;
  assetType?: MockAssetType;
}) {
  const classes = usePumpModalStyles();
  if (!assetType) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Grid item>
            <Typography variant='h6'>{asset.label || asset.id}</Typography>
          </Grid>
          <Grid item>
            <IconButton size='small'>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container item direction='column' spacing={1}>
          {Object.entries(asset.custom_data).map(([k, val]) => {
            const attr = assetType?.schema?.find((a) => a.attribute_name === k);
            if (!attr || attr?.hide_attribute) return null;
            const units = attr?.custom_view_settings?.units;
            const displayVal =
              k === 'State' ? (val ? 'Online' : 'Offline') : val;

            return (
              <Grid item container spacing={3} wrap='nowrap'>
                <Grid item xs={6}>
                  <Typography align='left'>
                    <b>{attr.attribute_label || attr.attribute_name}</b>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    align='left'
                    className={
                      k === 'State'
                        ? val
                          ? classes.success
                          : classes.disabled
                        : ''
                    }
                  >
                    {displayVal}
                    {units ? ` ${units}` : ''}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Grid container item spacing={2} className={classes.controlFooter}>
          <AssetControls asset={asset} assetType={assetType} />
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

const AssetControls = ({
  asset,
  assetType,
}: {
  asset: MockAsset;
  assetType?: MockAssetType;
}) => {
  const {
    assetControlPlugins: { getPluginById },
  } = utils.useAppPlugins();
  const { status, publish } = utils.useMessaging();
  const { data: userInfo } = utils.useUserInfo();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      {assetType.controls_schema.map((c) => {
        const p = getPluginById(c.widget_type);
        if (p) {
          const Widget = p.component;
          return (
            <Grid key={c.uuid} item xs={3}>
              <Widget
                settings={p.getLatestVersionOfSettings(c.widget_settings)}
                customData={asset?.custom_data ?? {}}
                onSubmit={(custom_data) => {
                  if (status.messaging && asset) {
                    const commandId = uuid();
                    // const payload: CommandRequestMessagePayload = {
                    const payload = {
                      asset: {
                        id: asset.id,
                        type: asset.type,
                        custom_id_1: asset.custom_id_1,
                        custom_id_2: asset.custom_id_2,
                        custom_data: asset.custom_data,
                        latitude: asset.latitude,
                        longitude: asset.longitude,
                        location_x: asset.location_x,
                        location_y: asset.location_y,
                        location_z: asset.location_z,
                      },
                      control: c,
                      command: {
                        id: commandId,
                      },
                      custom_data,
                      user: {
                        email: userInfo?.email ?? '',
                        user_id: userInfo?.user_id ?? '',
                      },
                    };
                    publish(
                      `_dbupdate/_monitor/_asset/${asset.id}/command/${commandId}/request`,
                      JSON.stringify(payload)
                    );
                    enqueueSnackbar('Command sent', {
                      variant: 'success',
                    });
                  }
                }}
                disabled={!status.messaging}
                // disabled={!assetControlsAccess || !status.messaging}
                isSubmitting={false}
              />
            </Grid>
          );
        }
        return null;
      })}
    </>
  );
};
