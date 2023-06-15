import { Button, Stack } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";

export default function TimeInputSection({
  showModal,
  onDateChange,
  onPrevious,
}) {
  const [value, setValue] = React.useState(dayjs());

  return (
    <Stack spacing={3}>
      <DateTimePicker
        label="Schedule Tweet"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          onDateChange(dayjs(newValue).toDate());
        }}
      />
      <Stack gap={4} flexDirection="row">
        <Button onClick={() => onPrevious()} sx={{ borderRadius: "10px" }}>
          Previous
        </Button>
        <Button
          onClick={() => showModal()}
          sx={{ borderRadius: "10px" }}
          variant="outlined"
        >
          Schedule Tweet
        </Button>
      </Stack>
    </Stack>
  );
}
