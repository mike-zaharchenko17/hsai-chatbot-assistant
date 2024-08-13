import { Box, Typography } from '@mui/material';

const ChatBubble = ({ message, isHuman }) => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: isHuman ? 'flex-end' : 'flex-start',
          mb: 2, // Adds margin between bubbles
        }}
      >
        <Box
          sx={{
            maxWidth: '60%',
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