import { useMediaQuery, useTheme } from '@material-ui/core';

export const useIsMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
};
