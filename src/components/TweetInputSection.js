import { TextField, Button } from "@mui/material";

export default function TweetInputSection({
  value,
  onNext,
  onTweetChange,
  disableNext,
}) {
  return (
    <>
      <TextField
        sx={{ height: "40vh", width: "40vw" }}
        id="filled-textarea"
        label="Tweet"
        placeholder="Enter Tweet"
        rows={10}
        value={value || " "}
        onChange={(e) => {
          onTweetChange(e.target.value);
        }}
        multiline
      />
      <Button
        sx={{ borderRadius: "10px", padding: "10px", width: "10vw" }}
        variant="outlined"
        onClick={() => onNext()}
        disabled={disableNext}
      >
        Next
      </Button>
    </>
  );
}
