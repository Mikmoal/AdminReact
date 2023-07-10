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

export const OverviewEvidence = (props) => {
  const { evidencias = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Evidencias" />
      <List>
        {evidencias.map((evidencia, index) => {
          const hasDivider = index < evidencias.length - 1;
          const ago = formatDistanceToNow(Date.parse(evidencia.updatedAt));

          return (
            <ListItem
              divider={hasDivider}
              key={evidencia.id}
            >
              {/* <ListItemAvatar>
                {
                  evidencia.image
                    ? (
                      <Box
                        component="img"
                        src={evidencia.image}
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
                primary={evidencia.name}
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

OverviewEvidence.propTypes = {
  evidencias: PropTypes.array,
  sx: PropTypes.object
};
