import { AppBar, Toolbar, Stack, Typography, SvgIcon } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';

export default function MuiNavbar() {
    return (
        <AppBar position='sticky' color='secondary'>
            <Toolbar>
                <Stack direction="row" spacing={2} alignItems="center">
                    <ChatIcon 
                    color="white" 
                    fontSize="large"
                    />
                    <Typography variant="h6">Your AI Assistant</Typography>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}