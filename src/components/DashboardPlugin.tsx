import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useFetchAssetByType } from '../api/useFetchAssetByType';
import Widgets from './Widgets';

export default function DashboardPlugin() {
  console.log('the URL', window.location.href);
  const [activeParent, setActiveParent] = useState<string>();
  const { data } = useFetchAssetByType('client');

  return (
    <div style={{ border: '1px solid red' }}>
      {data?.DATA?.map((parent) => (
        <Button onClick={() => setActiveParent(parent.id)}>
          View {parent.label}
        </Button>
      ))}
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
