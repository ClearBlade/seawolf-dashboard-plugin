import { makeStyles, Tab, Tabs } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useState } from 'react';
import { useFetchAssetByType } from '../api/useFetchAssetByType';
import { ClientTypeId } from '../constants.ts/typeNames';
import Widgets from './Widgets';

const usePluginStyles = makeStyles((theme) => ({
  plugin: {
    marginTop: theme.spacing(1),
  },
}));

export default function DashboardPlugin() {
  const classes = usePluginStyles();
  const [activeParent, setActiveParent] = useState<string>();
  const { data, isLoading, error } = useFetchAssetByType(ClientTypeId);

  if (isLoading) return <Skeleton />;
  if (error) return <div>Error</div>;

  return (
    <div className={classes.plugin}>
      <Tabs
        value={activeParent ?? data?.DATA?.[0]?.id}
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
            ? data?.DATA?.[0]
            : data?.DATA?.find((p) => p?.id === activeParent)
        }
      />
    </div>
  );
}
