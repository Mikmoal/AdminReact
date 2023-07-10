import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';

export const OverviewRecords = (props) => {
  const { grabaciones = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Grabaciones" />
      <List>
        {grabaciones.map((grabacion, index) => {
          const hasDivider = index < grabaciones.length - 1;
          const ago = formatDistanceToNow(Date.parse(grabacion.updatedAt));

          return (
            <ListItem
              divider={hasDivider}
              key={grabacion.id}
            >
              {/* <ListItemAvatar>
                {
                  grabacion.image
                    ? (
                      <Box
                        component="img"
                        src={grabacion.image}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                    : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'neutral.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar> */}
              <ListItemText
                primary={grabacion.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Updated ${ago} ago`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewRecords.propTypes = {
  grabaciones: PropTypes.array,
  sx: PropTypes.object
};
