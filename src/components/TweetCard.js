import { Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";

export default function TweetCard({ data }) {
  return (
    <>
      <Card sx={{ width: "60vw", minWidth: 275 }}>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography marginTop="3px">
              {dayjs(data.time.toDate()).format("L LT").toString()}
            </Typography>
            {/* <Delete sx={{ cursor: "pointer" }} /> */}
          </Stack>
          <TextField
            sx={{ width: "100%", marginTop: "30px" }}
            id="filled-textarea"
            label="Tweet"
            rows={5}
            value={data.tweet || " "}
            multiline
            disabled
          />
        </CardContent>
      </Card>
    </>
  );
}
