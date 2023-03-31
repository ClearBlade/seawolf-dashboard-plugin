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
  useTheme,
} from '@material-ui/core';
import { Palette, PaletteColor } from '@material-ui/core/styles/createPalette';
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar } from 'notistack';
import { v4 as uuid } from 'uuid';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Asset, AssetType } from '@clearblade/ia-mfe-core';
import {
  useAppPlugins,
  useMessaging,
  useUserInfo,
  useUserPermissions,
} from '@clearblade/ia-mfe-react';

const usePumpModalStyles = makeStyles((theme) => ({
  controlFooter: {
    padding: theme.spacing(2),
  },
  success: {
    color: theme.palette.success.main,
  },
  disabled: {
    color: theme.palette.text.disabled,
  },
  error: {
    color: theme.palette.error.main,
  },
  blue: {
    color: '#1264a3',
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
  asset: Asset['frontend'];
  assetType?: AssetType['frontend'];
}) {
  const { palette } = useTheme();
  const classes = usePumpModalStyles();
  const isMobile = useIsMobile();
  if (!assetType) return null;

  const customDataAttrs = Object.entries(asset.custom_data);
  const shownAttributes = assetType.schema.filter(
    (attr) => !attr.hide_attribute
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={isMobile ? undefined : 'sm'}
      fullScreen={isMobile}
      fullWidth
    >
      <DialogTitle>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Grid item>
            <Typography variant='h6'>{asset.label || asset.id}</Typography>
          </Grid>
          <Grid item>
            <IconButton size='small' onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container item direction='column' spacing={1}>
          {customDataAttrs.length === 0 && (
            <Typography>No data found</Typography>
          )}
          {shownAttributes.map((attr) => {
            const val = asset.custom_data[attr.attribute_name];
            const { trueColorLight, falseColorLight, trueLabel, falseLabel } =
              attr?.custom_view_settings ?? {};

            // Get custom true/false label
            let displayAttrVal =
              typeof val === 'undefined'
                ? ''
                : (val as Asset['frontend']['custom_data']['string']);
            if (
              typeof trueLabel === 'string' &&
              typeof falseLabel === 'string'
            ) {
              displayAttrVal = displayAttrVal ? trueLabel : falseLabel;
            }
            // Get custom units
            const units = attr?.custom_view_settings?.units;
            // Get custom display color
            let displayColor = 'inherit';
            // For now, we can just use light mode colors, because seawolf has the same colors set for light/dark modes. In the future, we might need to implement sharing state with the root app to access isDarkMode
            if (
              trueColorLight &&
              falseColorLight &&
              typeof trueColorLight === 'object' &&
              typeof falseColorLight === 'object' &&
              'colorType' in trueColorLight &&
              'colorType' in falseColorLight
            ) {
              const trueColorCode =
                typeof trueColorLight === 'string'
                  ? trueColorLight
                  : trueColorLight.colorType === 'theme'
                  ? (
                      palette[
                        trueColorLight.value as keyof Palette
                      ] as PaletteColor
                    )?.main
                  : trueColorLight.value;
              const falseColorCode =
                typeof falseColorLight === 'string'
                  ? falseColorLight
                  : falseColorLight.colorType === 'theme'
                  ? (
                      palette[
                        falseColorLight.value as keyof Palette
                      ] as PaletteColor
                    )?.main
                  : falseColorLight.value;
              displayColor =
                typeof val !== 'undefined' ? trueColorCode : falseColorCode;
            }

            return (
              <Grid item container spacing={3} wrap='nowrap'>
                <Grid item xs={6}>
                  <Typography align='left'>
                    <b>{attr.attribute_label || attr.attribute_name}</b>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align='left' style={{ color: displayColor }}>
                    {displayAttrVal.toString()}
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
  asset: Asset['frontend'];
  assetType?: AssetType['frontend'];
}) => {
  const {
    assetControlPlugins: { getPluginById },
  } = useAppPlugins();
  const { status, publish } = useMessaging();
  const { data: userInfo } = useUserInfo();
  const { data: userPerms } = useUserPermissions();
  const { enqueueSnackbar } = useSnackbar();

  const userIsViewer = !userPerms?.admin && !userPerms?.edit;
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
                // Normally disabling is based off of whether user has access permissions from custom_settings, but that was more difficult to implement for microfrontends so we did it based on whether the user is a viewer
                disabled={!status.messaging || userIsViewer}
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
