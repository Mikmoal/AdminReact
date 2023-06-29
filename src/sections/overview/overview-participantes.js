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

export const OverviewParticipants = (props) => {
  const { participantes, sx } = props;
  const participantesArr = participantes.split(",");
  return (
    <Card sx={sx}>
      <CardHeader title="Participantes" />
      <List>
        {participantesArr.map((participante, index) => {
          const hasDivider = index < participantes.length - 1;
          // const ago = formatDistanceToNow(participante.updatedAt);

          return (
            <ListItem
              divider={hasDivider}
              key={participante.id}
            >
              <ListItemAvatar>
                {
                  participante.image
                    ? (
                      <Box
                        component="img"
                        src={participante.image}
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
              </ListItemAvatar>
              <ListItemText
                primary={participante}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                // secondary={`Updated ${ago} ago`}
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

OverviewParticipants.propTypes = {
  participantes: PropTypes.array,
  sx: PropTypes.object
};
