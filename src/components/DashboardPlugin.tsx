import { Button, makeStyles, Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { useFetchAssetByType } from '../api/useFetchAssetByType';
import Widgets from './Widgets';

const useTabsStyles = makeStyles((theme) => ({
  tabs: {
    marginBottom: theme.spacing(2),
  },
}));

export default function DashboardPlugin() {
  const classes = useTabsStyles();
  const [activeParent, setActiveParent] = useState<string>();
  const { data } = useFetchAssetByType('client');

  return (
    <div>
      <Tabs
        className={classes.tabs}
        value={activeParent}
        indicatorColor='primary'
        textColor='primary'
        onChange={(_, val) => {
          if (typeof val === 'string') {
            setActiveParent(val);
          }
        }}
      >
        {data?.DATA?.map((parent, index) => (
          <Tab
            key={parent.id}
            selected={
              (!activeParent && index === 0) || activeParent === parent.id
            }
            label={parent.label}
            value={parent.id}
          />
        ))}
      </Tabs>
      <Widgets
        parent={
          !activeParent
            ? data?.DATA[0]
            : data?.DATA?.find((p) => p.id === activeParent)
        }
      />
    </div>
  );
}
