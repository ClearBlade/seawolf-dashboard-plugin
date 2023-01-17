import { Card, Grid } from '@material-ui/core';
import React from 'react';

export default function WidgetShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid item>
      <Card style={{ padding: 16, height: 300, width: 300 }}>{children}</Card>
    </Grid>
  );
}
