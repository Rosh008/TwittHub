import React from "react";
import TweetInputSection from "./TweetInputSection";
import TimeInputSection from "./TimeInputSection";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import dayjs from "dayjs";
import { AuthContext } from "../App";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../setupFirebase";

const getDate = () => {
  return new Date();
};

const defaultLayoutState = {
  index: 0,
  tweetData: null,
  time: getDate(),
};

export default function FlowLayout() {
  const [layoutState, setLayoutState] = React.useState(defaultLayoutState);
  const [open, setOpen] = React.useState(false);
  const { authDetails } = React.useContext(AuthContext);

  function onTweetChange(data) {
    setLayoutState({ ...layoutState, tweetData: data });
  }
  function onNext() {
    setLayoutState({ ...layoutState, index: layoutState.index + 1 });
  }

  function onPrevious() {
    setLayoutState({ ...layoutState, index: layoutState.index - 1 });
  }

  function onDateChange(date) {
    setLayoutState({ ...layoutState, time: date });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const scheduleTweet = async () => {
    handleClose();
    // schedule tweet
    try {
      await addDoc(collection(db, "tweets"), {
        status: "pending",
        time: layoutState.time,
        tweet: layoutState.tweetData,
        uid: authDetails.user,
      });
      // reset state
      setLayoutState({ index: 0, tweetData: null, time: getDate() });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Box position="absolute" sx={{ top: "2rem", right: "6rem" }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar alt="profile pic" src={authDetails.profileImg} />
          <Typography fontWeight="bold" color="white">
            {authDetails.userName}
          </Typography>
        </Box>
      </Box>

      {layoutState.index === 0 ? (
        <TweetInputSection
          value={layoutState.tweetData}
          disableNext={!layoutState.tweetData}
          onNext={onNext}
          onTweetChange={onTweetChange}
        />
      ) : (
        <TimeInputSection
          showModal={handleClickOpen}
          onDateChange={onDateChange}
          onPrevious={onPrevious}
        />
      )}
      <Dialog
        PaperProps={{
          sx: {
            width: "50%",
            maxHeight: 500,
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <Stack direction="row" alignItems="center">
          <DialogTitle>{"Schedule tweet"}</DialogTitle>
          <Typography marginTop="3px">
            {dayjs(layoutState.time).format("L LT").toString()}
          </Typography>
        </Stack>
        <DialogContent>
          <TextField
            sx={{ width: "100%", marginTop: "2px" }}
            id="filled-textarea"
            label="Tweet"
            rows={5}
            value={layoutState.tweetData || " "}
            multiline
            disabled
          />
        </DialogContent>
        <DialogActions
          sx={{ padding: "15px", justifyContent: "space-between" }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={scheduleTweet} variant="contained" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
