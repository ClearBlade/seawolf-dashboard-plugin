// @ts-ignore
import * as utils from '@ia/mfe';
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
  // @ts-ignore
} from '@material-ui/core';
// @ts-ignore
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// @ts-ignore
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
// @ts-ignore
import RefreshIcon from '@material-ui/icons/Refresh';
// @ts-ignore
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
  marginRight: {
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
              utils.appQueryClient.invalidateQueries(
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
            {getLabelForRefreshRate(selectedRate, true)}
            {!menuOpen ? (
              <ArrowDropDownIcon
                fontSize='small'
                className={selectedRate.count ? classes.marginRight : ''}
              />
            ) : (
              <ArrowDropUpIcon
                fontSize='small'
                className={selectedRate.count ? classes.marginRight : ''}
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
