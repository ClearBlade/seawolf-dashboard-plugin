import { appQueryClient } from '@clearblade/ia-mfe-react';
import {
  Box,
  Button,
  ButtonGroup,
  makeStyles,
  MenuItem,
  MenuList,
  Popover,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import RefreshIcon from '@material-ui/icons/Refresh';
import React from 'react';
import { assetByIdsQueryKeys } from '../api/useFetchAssetsByIds';
import {
  RefreshRateOptions,
  TimeUnitLabels,
  TimeUnitMultiplier,
} from '../constants.ts/refreshRate';
import useOnClickOutside from '../hooks/useOnOutsideClick';
import useRefreshRateStore from '../stores/useRefreshRateStore';

const useStyles = makeStyles((theme) => ({
  refreshButton: {
    width: theme.spacing(5.5),
    height: theme.spacing(4),
    border: `1px solid ${theme.palette.text.primary} !important`,
    borderRadius: theme.shape.borderRadius,
  },
  rateButton: {
    textTransform: 'none',
    alignItems: 'center',
    height: theme.spacing(4),
    border: `1px solid ${theme.palette.text.primary} !important`,
    borderRadius: theme.shape.borderRadius,
  },
  marginLeft: {
    marginLeft: theme.spacing(1),
  },
  popper: {
    overflow: 'hidden',
  },
  paper: {
    overflow: 'auto',
  },
}));

export default function RefreshRateSetting({
  assetIds,
}: {
  assetIds: string[];
}) {
  const classes = useStyles();
  const [setRefreshRate] = useRefreshRateStore((state) => [
    state.setRefreshRate,
  ]);

  const anchorRef = React.useRef(null);
  const [selectedIdx, setSelectedIdx] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const selectedRate = RefreshRateOptions[selectedIdx];
  const menuRef = React.useRef(null);
  useOnClickOutside(menuRef, () => setMenuOpen(false));

  return (
    <>
      <ButtonGroup>
        <Tooltip title='Refresh dashboard'>
          <Button
            size='small'
            onClick={() =>
              appQueryClient.invalidateQueries(
                assetByIdsQueryKeys.detail({ ids: assetIds })
              )
            }
            className={classes.refreshButton}
          >
            <RefreshIcon fontSize='small' />
          </Button>
        </Tooltip>
        <Tooltip title='Select auto-refresh interval'>
          <Button
            size='small'
            ref={anchorRef}
            onClick={() => setMenuOpen(true)}
            className={classes.rateButton}
          >
            <div className={classes.marginLeft}>
              {getLabelForRefreshRate(selectedRate, true)}
            </div>
            {!menuOpen ? (
              <ArrowDropDownIcon
                fontSize='small'
                className={selectedRate.count ? classes.marginLeft : ''}
              />
            ) : (
              <ArrowDropUpIcon
                fontSize='small'
                className={selectedRate.count ? classes.marginLeft : ''}
              />
            )}
          </Button>
        </Tooltip>
      </ButtonGroup>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        className={classes.popper}
        open={menuOpen}
        anchorEl={anchorRef.current}
      >
        <Box>
          <MenuList ref={menuRef}>
            <MenuItem disabled>
              <Typography variant='body2' color='textSecondary'>
                Auto-refresh interval
              </Typography>
            </MenuItem>
            {RefreshRateOptions.map((opt, idx) => (
              <MenuItem
                key={opt.count * opt.units}
                onClick={() => {
                  setSelectedIdx(idx);
                  setRefreshRate(opt.count * opt.units);
                  setMenuOpen(false);
                }}
                button
              >
                <Typography variant='body2'>
                  {getLabelForRefreshRate(opt)}
                </Typography>
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      </Popover>
    </>
  );
}

export const getLabelForRefreshRate = (
  rate: { count: number; units: TimeUnitMultiplier },
  abbrev?: boolean
) => {
  if (rate.count === 0) {
    return abbrev ? '' : 'Off';
  }
  const labels = TimeUnitLabels(abbrev).find((opt) => opt.id === rate.units);
  const countAndUnits = `${rate.count}${abbrev ? '' : ' '}${
    rate.count === 1 ? labels?.singular : labels?.plural
  }`;
  return abbrev ? countAndUnits : `${countAndUnits}`;
};
