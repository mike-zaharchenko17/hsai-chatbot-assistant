"use client";

import {  
  Typography, 
  Box, 
  Grid,
  Select,
  MenuItem,
} from '@mui/material';

import SmartToyIcon from '@mui/icons-material/SmartToy';
import SendIcon from '@mui/icons-material/Send';

import MuiNavbar from '../components/MuiNavbar.js';
import ChatBubble from '../components/ChatBubble.js';
import ChatIcon from '@mui/icons-material/Chat';

import { LoadingButton } from '@mui/lab';

import { useState, useEffect } from 'react';


export default function Home() {

  const [messageLog, setMessageLog] = useState([{}]);
  const [outgoingMessage, setOutgoingMessage] = useState({ isHuman: true, msg: '', selectedLanguage: 'English'});
  const [waitingOnResponse, setWaitingOnResponse] = useState(false);

  const sendToApi = async (e) => {
    e.preventDefault();

    if (outgoingMessage.msg === '') {
      return;
    }

    setWaitingOnResponse(true);
    setMessageLog((prevMessageLog) => [...prevMessageLog, outgoingMessage]);
    setOutgoingMessage({...outgoingMessage, msg:''});
    console.log(`After update 1: ${messageLog}`);
    try {
      const response = await fetch("/api/main", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(outgoingMessage)
      });
      let responseData;
        try {
          responseData = await response.json();
          setMessageLog((prevMessageLog) => [...prevMessageLog, responseData]);
          console.log(`After update 2: ${messageLog}`);
      } catch (jsonError) {
          console.error("Failed to parse JSON:", jsonError);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setWaitingOnResponse(false);
    }

  }

  return (
    <>
    <MuiNavbar />
    <main className="flex min-h-screen flex-col items-center p-24 bg-white">
      <Box
        component="div"
        sx={{
          height: "72vh",
          bgcolor: "#cbd5e1",
          borderRadius: 2,
          position: 'relative',
          width: { xs: '100%', sm: '90%' },
          '@media (max-width: 600px)': {
            height: "58vh",
          },
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Box display='flex' justifyContent='flex-start' alignItems='center' px={4}>
              <SmartToyIcon 
                color="secondary" 
                fontSize="large"
              />
              <Typography
                color="secondary" 
                py={3} px={4}
                sx={{ typography: { sm: 'h5', xs: 'h7' } }}
              >
                Chat with AI Assistant
              </Typography>
            </Box>     
            <Box
              className="no-scrollbar"
              sx={{
                overflow: 'auto',
                height: "calc(72vh - 120px)", 
                position: 'relative', 
                '@media (max-width: 600px)': {
                  height: "calc(58vh - 120px)",
                },
              }}
            >
              {messageLog.map((item, index) => (
                (index > 0) ? 
                  <ChatBubble key={index} message={item.msg} isHuman={item.isHuman} />
                  : null
              ))}
            </Box>
          </Grid>
        </Grid>
        <Grid 
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            position: 'relative',
            top: 'auto',
          }}
        >
          <Grid item xs={12}>
            <form>
              <label htmlFor="chat" className="sr-only">Your message</label>
              <Box 
                display="flex" 
                flexDirection={{ xs: 'column', sm: 'row' }} // Stack on small screens
                justifyContent="center" 
                alignItems="center" 
                px={3} py={2} 
                gap={{ xs: 2, sm: 0 }}
                sx={{ backgroundColor: 'slategray' }
              }>
                <Select
                  value={outgoingMessage.selectedLanguage}
                  label="Language"
                  onChange={(e) => setOutgoingMessage({ ...outgoingMessage, selectedLanguage: e.target.value })}
                  size="small"
                  sx={{
                    borderRadius: 0,
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: 0
                    },
                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "none"
                    },
                    width: { xs: '100%', sm: 'auto' }
                  }}
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Spanish">Spanish</MenuItem>
                  <MenuItem value="Mandarin">Mandarin</MenuItem>
                  <MenuItem value="Russian">Russian</MenuItem>
                  <MenuItem value="Hindi">Hindi</MenuItem>
                  <MenuItem value="French">French</MenuItem>
                  <MenuItem value="Portuguese">Portuguese</MenuItem>
                  <MenuItem value="Arabic">Arabic</MenuItem>
                </Select>

                <input 
                  id="chat"
                  rows="1"
                  value={outgoingMessage.msg}
                  className="block mx-4 p-2.5 w-full sm:w-7/12 text-sm text-gray-900 bg-white rounded-lg border border-gray-300"
                  placeholder="Your message..."
                  onChange={(e) => setOutgoingMessage({ ...outgoingMessage, msg: e.target.value })}
                />

                <LoadingButton
                  size="small"
                  color="secondary"
                  onClick={(e) => sendToApi(e)}
                  loading={waitingOnResponse}
                  loadingPosition="start"
                  startIcon={<SendIcon />}
                  variant="contained"
                >
                  <span>Send</span>
                  <span className="sr-only">Send Message</span>
                </LoadingButton>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Box>
    </main>
  </>
  );
}
