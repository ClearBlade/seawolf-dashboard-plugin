import { Card, Grid } from '@mui/material';
import React from 'react';

export default function WidgetShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid item>
      <Card sx={{ padding: 2, height: 300, width: 300 }}>{children}</Card>
    </Grid>
  );
}
