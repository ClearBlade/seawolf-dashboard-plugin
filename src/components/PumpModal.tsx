import {
  Dialog,
  DialogContent,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { MockAsset, MockAssetType } from '../mocks/types';

const usePumpModalStyles = makeStyles((theme) => ({
  success: {
    color: theme.palette.success.main,
  },
  disabled: {
    color: theme.palette.text.disabled,
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
      <DialogContent>
        <Grid container direction='column' spacing={1}>
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
                    {attr.attribute_label || attr.attribute_name}
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
        <Divider />
        <Grid container>
          <Typography>controls</Typography>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
