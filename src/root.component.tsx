// @ts-ignore
import * as utils from 'microfrontendUtils';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import Widgets from './components/Widgets';
import { useFetchAssetByType } from './api/useFetchAssetByType';
import { QueryClientProvider } from 'react-query';
import DashboardPlugin from './components/DashboardPlugin';

export default function Root() {
  console.log('utils', utils);
  return (
    <QueryClientProvider contextSharing client={utils.appQueryClient}>
      <DashboardPlugin />
    </QueryClientProvider>
  );
}
