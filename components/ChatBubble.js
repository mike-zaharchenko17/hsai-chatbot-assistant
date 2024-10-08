import { Box, Typography } from '@mui/material';

const ChatBubble = ({ message, isHuman }) => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: isHuman ? 'flex-end' : 'flex-start',
          mb: 2, // Adds margin between bubbles
          mx: 5,
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: '95%', sm: '60%' },
            bgcolor: isHuman ? 'primary.main' : 'grey.300',
            color: isHuman ? 'white' : 'black',
            p: 2,
            borderRadius: 2,
          }}
        >
          <Typography>{message}</Typography>
        </Box>
      </Box>
    );
  };

export default ChatBubble;