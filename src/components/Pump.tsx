// @ts-ignore
import * as utils from 'microfrontendUtils';
import {
  Box,
  Card,
  CircularProgress,
  LinearProgress,
  List,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { MockAsset, MockEventBackendWithRuleLabel } from '../mocks/types';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import WidgetShell from './WidgetShell';
import ToysIcon from '@material-ui/icons/Toys';
import { Skeleton } from '@material-ui/lab';

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
  asset: MockAsset;
  openEvents?: MockEventBackendWithRuleLabel[];
}) {
  const { data: assetTypesQuery, isLoading: loadingAssetTypes } =
    utils.useAssetTypesCache();
  const assetType = assetTypesQuery?.DATA[asset.type];
  const classes = usePumpStyles();

  return (
    <WidgetShell>
      {loadingAssetTypes ? (
        <Skeleton />
      ) : (
        <List>
          {openEvents.length > 0 && (
            <ListItem>
              <NotificationImportantIcon />
            </ListItem>
          )}

          <ListItem>
            <Typography align='center'>
              <b>{asset.label}</b>
            </Typography>
          </ListItem>
          <ListItem>
            <ToysIcon
              className={
                asset.custom_data['State'] ? classes.success : classes.disabled
              }
            />
          </ListItem>
          <PumpAttr label={'RPM'} value={'??'} />
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
        </List>
      )}
    </WidgetShell>
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
    <ListItem>
      <Typography variant='body2'>
        {label} {value}
        {units ? ` ${units}` : ''}
      </Typography>
    </ListItem>
  );
};
