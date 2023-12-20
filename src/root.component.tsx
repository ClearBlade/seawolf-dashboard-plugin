import { getBasePath } from '@clearblade/ia-mfe-core';
import { appQueryClient, RecoilRoot } from '@clearblade/ia-mfe-react';
import { SnackbarProvider } from 'notistack';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import DashboardPlugin from './components/DashboardPlugin';

export default function Root() {
  return (
    <RecoilRoot>
      <BrowserRouter basename={getBasePath()}>
        <QueryClientProvider contextSharing client={appQueryClient}>
          <SnackbarProvider>
            <DashboardPlugin />
          </SnackbarProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}
