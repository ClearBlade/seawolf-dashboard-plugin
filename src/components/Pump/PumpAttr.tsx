import { Grid, Typography } from '@material-ui/core';

const PumpAttr = ({
  label,
  units,
  value,
}: {
  label: string;
  units?: string;
  value?: unknown;
}) => {
  if (typeof value === 'undefined') return null;
  return (
    <Grid item>
      <Typography variant='body2'>
        {label} {value}
        {units ? ` ${units}` : ''}
      </Typography>
    </Grid>
  );
};

export default PumpAttr;
