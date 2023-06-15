import { Box, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import TweetCard from "../components/TweetCard";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../setupFirebase";
import { AuthContext } from "../App";

export default function Tweets() {
  const [tweetData, setTweetData] = useState();
  const { authDetails } = useContext(AuthContext);

  const tweetQuery = query(
    collection(db, "tweets"),
    where("uid", "==", authDetails.user),
    where("status", "==", "pending"),
    orderBy("time", "asc")
  );

  useEffect(() => {
    if (authDetails.isConnected) {
      try {
        const data = [];
        getDocs(tweetQuery)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              data.push(doc.data());
            });
          })
          .then(() => {
            setTweetData(data);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, [authDetails.isConnected]);

  return (
    <>
      {!authDetails.isConnected ? (
        <Box
          height="90vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Connect your twitter account first !!
          </Typography>
        </Box>
      ) : (
        <Box m={10} textAlign="center">
          <Stack spacing={4}>
            {tweetData?.map((data, index) => {
              return <TweetCard key={`tweet-${index}`} data={data} />;
            })}
          </Stack>
        </Box>
      )}
    </>
  );
}
