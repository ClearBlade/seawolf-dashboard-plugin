import * as utils from '@ia/mfe';
import { SnackbarProvider } from 'notistack';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import DashboardPlugin from './components/DashboardPlugin';

export default function Root() {
  return (
    <BrowserRouter basename={utils.getBasePath()}>
      <QueryClientProvider contextSharing client={utils.appQueryClient}>
        <SnackbarProvider>
          <DashboardPlugin />
        </SnackbarProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
