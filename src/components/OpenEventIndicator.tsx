import React from 'react';
import { MockEventBackendWithRuleLabel } from '../mocks/types';
// @ts-ignore
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
// @ts-ignore
import { IconButton, makeStyles } from '@material-ui/core';
// @ts-ignore
import { useNavigate } from 'react-router-dom';

const useOpenEventIndicatorStyle = makeStyles((theme) => ({
  icon: {
    color: theme.palette.warning.main,
  },
}));

export default function OpenEventIndicator({
  openEvents,
  assetId,
}: {
  openEvents?: MockEventBackendWithRuleLabel[];
  assetId: string;
}) {
  const classes = useOpenEventIndicatorStyle();
  const nav = useNavigate();
  if (!openEvents || openEvents.length === 0) return null;

  return (
    <IconButton
      size='small'
      onClick={() => nav(`assets/detail/${assetId}/?tab=events`)}
    >
      <NotificationImportantIcon className={classes.icon} />
    </IconButton>
  );
}
