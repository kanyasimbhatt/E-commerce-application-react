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
import type { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useSidebar } from './SidebarProvider';
import type { FilterType } from './ViewAllProducts';


type childrenType = {
  register: UseFormRegister<FilterType>;
  filter: FilterType;
  setValue: UseFormSetValue<FilterType>
};

export const SidebarDrawer = ({ register, filter, setValue }: childrenType) => {
  const { open, setOpen } = useSidebar();
  const drawerWidth = 350;

  const sortByOptions = ['none', 'name', 'price', 'rating'];

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickOnPriceRange = (e: React.MouseEvent) => {
    if (
      'id' in e.target! &&
      e.target.id !== 'input' &&
      'name' in e.target! &&
      e.target.name === 'button'
    ) {
      const [lowRange, highRange] = (e.target.id as string).split('-');
      setValue('range.low', +lowRange);
      setValue('range.high', +highRange);
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
        <TextField
          label="Search By Name"
          size="small"
          {...register('search')}
        />
        <TextField select label="Sort By" defaultValue={'none'} size="small" 
        {...register('sortBy')}
        >
          {sortByOptions.map((option: string) => (
            <MenuItem key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Sort Order"
          defaultValue={'LowToHigh'}
          size="small"
          {...register('sortOrder')}
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
          <Stack>
            <Typography variant="body1">Categories: </Typography>
            <FormGroup
              sx={{ paddingLeft: '20px' }}
            >
              <FormControlLabel
                control={<Checkbox />}
                value={'groceries'}
                label="Groceries"
                {...register('categories')}
              />
              <FormControlLabel
                control={<Checkbox />}
                value={'furniture'}
                label="Furniture"
                {...register('categories')}
              />
              <FormControlLabel
                control={<Checkbox />}
                value={'fragrances'}
                label="Fragrances"
                {...register('categories')}
              />
              <FormControlLabel
                control={<Checkbox />}
                value={'beauty'}
                label="Beauty"
                {...register('categories')}
              />
            </FormGroup>
          </Stack>
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
              disabled={
                filter.range.low === 0 && filter.range.high === 25
                  ? true
                  : false
              }
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
              disabled={
                filter.range.low === 25 && filter.range.high === 50
                  ? true
                  : false
              }
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
              disabled={
                filter.range.low === 50 && filter.range.high === 75
                  ? true
                  : false
              }
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
              disabled={
                filter.range.low === 75 && filter.range.high === 100
                  ? true
                  : false
              }
            >
              75-100$
            </Button>

            <Button
              sx={{
                backgroundColor: 'rgba(0, 106, 255, 0.6)',
                padding: '5px',
                borderRadius: '4px',
                color: 'black',
              }}
              name="button"
              id="100-150"
              disabled={
                filter.range.low === 100 && filter.range.high === 150
                  ? true
                  : false
              }
            >
              100-150$
            </Button>

            <Button
              sx={{
                backgroundColor: 'rgba(0, 106, 255, 0.6)',
                padding: '5px',
                borderRadius: '4px',
                color: 'black',
              }}
              name="button"
              id="0-150"
              disabled={
                filter.range.low === 0 && filter.range.high === 150
                  ? true
                  : false
              }
            >
              All
            </Button>
            <Stack
              direction={'row'}
              spacing={6}
            >
              <TextField
                id="input"
                type="number"
                variant="outlined"
                label="Min"
                size="small"
                sx={{ width: '70px' }}
                {...register('range.low')}
              />
              <TextField
                id="input"
                type="number"
                variant="outlined"
                label="Max"
                size="small"
                sx={{ width: '70px' }}
                {...register('range.high')}
              />
            </Stack>
          </Grid>
          <Stack>
            <Typography variant='body1'>Select Rating</Typography>   
            <Slider
              aria-label="Temperature"
              defaultValue={0}
              valueLabelDisplay="auto"
              shiftStep={0.1}
              step={0.1}
              marks
              {...register('rating')}
              min={0}
              max={5}
            />
         </Stack>
        </Stack>
      </Stack>
    </Drawer>
  );
};
