import {
  Drawer,
  IconButton,
  Divider,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Slider,
  Grid,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useSidebar } from './SidebarProvider';
import type { RangeType } from './ViewAllProducts';

type childrenType = {
  range: RangeType;
  setRange: React.Dispatch<React.SetStateAction<RangeType>>;
  categories: Array<string>;
  setCategories: React.Dispatch<React.SetStateAction<Array<string>>>;
};

export const SidebarDrawer = ({
  range,
  setRange,
  categories,
  setCategories,
}: childrenType) => {
  const { open, setOpen } = useSidebar();
  const drawerWidth = 350;

  const handleDrawerClose = () => {
    setOpen(false);
  };

  type Option = {
    value: string;
    label: string;
  };

  const sortByOptions = [
    {
      value: 'None',
      label: 'None',
    },
    {
      value: 'Name',
      label: 'Name',
    },
    {
      value: 'Price',
      label: 'Price',
    },
    {
      value: 'Rating',
      label: 'Rating',
    },
  ];

  const handleClickOnPriceRange = (e: React.MouseEvent) => {
    if (
      'id' in e.target! &&
      e.target.id !== 'input' &&
      'name' in e.target! &&
      e.target.name === 'button'
    ) {
      const [lowRange, highRange] = (e.target.id as string).split('-');
      setRange({ low: +lowRange, high: +highRange });
    }
  };

  const handleChangeOnLow = (value: number) => {
    setRange({ ...range, low: +value });
  };

  const handleChangeOnHigh = (value: string) => {
    setRange({ ...range, high: +value });
  };

  const handleClickOnFilterInput = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleClickOnCategories = (event: React.MouseEvent) => {
    if ('value' in event.target && 'checked' in event.target) {
      const selected = event.target.value as string;
      if (event.target.checked) {
        const categoryArray = new Set([...categories, selected]);
        setCategories([...categoryArray]);
      } else {
        const index = categories.findIndex(
          (category: string) => category === selected
        );
        categories.slice(index, 1);
        setCategories([...categories]);
      }
    }
  };
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Stack
        display={'flex'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        paddingLeft={'10px'}
        sx={{ backgroundColor: 'rgba(0, 106, 255, 0.6)' }}
      >
        <Typography variant="h6">Filter Products</Typography>
        <IconButton onClick={handleDrawerClose} sx={{ width: '50px' }}>
          <ChevronLeftIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Stack padding={'20px'} spacing={3}>
        <TextField label="Search By Name" size="small" />
        <TextField select label="Sort By" defaultValue={'None'} size="small">
          {sortByOptions.map((option: Option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Sort Order"
          defaultValue={'LowToHigh'}
          size="small"
        >
          <MenuItem key="LowToHigh" value="LowToHigh">
            Low To High
          </MenuItem>
          <MenuItem key="HighToLow" value="HighToLow">
            High To Low
          </MenuItem>
        </TextField>

        <Typography variant="h6">Filter Options:</Typography>
        <Stack padding={'10px 0 0 20px'} gap={3}>
          <Typography variant="body1">Select Filter Range: </Typography>
          <Grid
            container
            columnGap={6}
            rowGap={2}
            justifyContent={'center'}
            onClick={handleClickOnPriceRange}
          >
            <Button
              sx={{
                backgroundColor: 'rgba(0, 106, 255, 0.6)',
                padding: '5px',
                borderRadius: '4px',
                color: 'black',
              }}
              id="0-25"
              name="button"
              disabled={range.low === 0 && range.high === 25 ? true : false}
            >
              0 - 25$
            </Button>

            <Button
              sx={{
                backgroundColor: 'rgba(0, 106, 255, 0.6)',
                padding: '5px',
                borderRadius: '4px',
                color: 'black',
              }}
              name="button"
              id="25-50"
              disabled={range.low === 25 && range.high === 50 ? true : false}
            >
              25 - 50$
            </Button>

            <Button
              sx={{
                backgroundColor: 'rgba(0, 106, 255, 0.6)',
                padding: '5px',
                borderRadius: '4px',
                color: 'black',
              }}
              name="button"
              id="50-75"
              disabled={range.low === 50 && range.high === 75 ? true : false}
            >
              50 - 75$
            </Button>

            <Button
              sx={{
                backgroundColor: 'rgba(0, 106, 255, 0.6)',
                padding: '5px',
                borderRadius: '4px',
                color: 'black',
              }}
              name="button"
              id="75-100"
              disabled={range.low === 75 && range.high === 100 ? true : false}
            >
              75-100$
            </Button>
            <Stack
              direction={'row'}
              spacing={6}
              onClick={handleClickOnFilterInput}
            >
              <TextField
                id="input"
                type="number"
                variant="outlined"
                label="Min"
                size="small"
                sx={{ width: '70px' }}
                onChange={(event) => handleChangeOnLow(+event.target.value)}
              />
              <TextField
                id="input"
                type="number"
                variant="outlined"
                label="Max"
                size="small"
                sx={{ width: '70px' }}
                onChange={(event) => handleChangeOnHigh(event.target.value)}
              />
            </Stack>
          </Grid>
          <Slider
            aria-label="Temperature"
            defaultValue={0}
            valueLabelDisplay="auto"
            shiftStep={5}
            step={5}
            marks
            min={range.low}
            max={range.high}
            disabled={range.low === 0 && range.high === 100}
          />
          <Stack>
            <Typography variant="body1">Categories: </Typography>
            <FormGroup
              sx={{ paddingLeft: '20px' }}
              onClick={handleClickOnCategories}
            >
              <FormControlLabel
                control={<Checkbox />}
                value={'groceries'}
                label="Groceries"
              />
              <FormControlLabel
                control={<Checkbox />}
                value={'furniture'}
                label="Furniture"
              />
              <FormControlLabel
                control={<Checkbox />}
                value={'fragrances'}
                label="Fragrances"
              />
              <FormControlLabel
                control={<Checkbox />}
                value={'beauty'}
                label="Beauty"
              />
            </FormGroup>
          </Stack>
        </Stack>
      </Stack>
    </Drawer>
  );
};
