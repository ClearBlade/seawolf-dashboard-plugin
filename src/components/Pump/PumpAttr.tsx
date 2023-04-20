import { Grid, Typography, makeStyles } from '@material-ui/core';

const usePumpAttrStyles = makeStyles({
  text: {
    align: 'left',
  },
});

const PumpAttr = ({
  label,
  units,
  value,
}: {
  label: string;
  units?: string | number;
  value?: unknown;
}) => {
  const classes = usePumpAttrStyles();
  if (typeof value === 'undefined') return null;
  return (
    <Grid item>
      <Typography variant='body2' className={classes.text}>
        {label} {value}
        {units ? ` ${units}` : ''}
      </Typography>
    </Grid>
  );
};

export default PumpAttr;
