import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

import { Controller } from "react-hook-form";

function SourceForm({
  title,
  register,
  errors,
  handleSubmit,
  onSubmitHandler,
  control,
  loading,
}) {
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} style={{ margin: "20px" }}>
      <Typography variant="h4" align="center">
        {title}
      </Typography>
      <FormControl margin="normal" fullWidth>
        <TextField
          inputRef={register({ required: true })}
          label="Name"
          variant="outlined"
          name="name"
          error={!!errors.name}
          helperText={errors.name && errors.name.message}
          type="text"
        />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <TextField
          inputRef={register({ required: true })}
          label="Description"
          variant="outlined"
          name="description"
          error={!!errors.description}
          helperText={errors.description && errors.description.message}
          type="text"
        />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <TextField
          inputRef={register({ required: true })}
          label="Amount"
          variant="outlined"
          name="amount"
          error={!!errors.amount}
          helperText={errors.amount && errors.amount.message}
          type="text"
        />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel>Source Type</InputLabel>
        <Controller
          as={
            <Select
              name="sourceType"
              variant="outlined"
              error={!!errors.sourceType}
              helperText={errors.sourceType && errors.sourceType.message}
            >
              <MenuItem value={0}>Available</MenuItem>
              <MenuItem value={1}>From</MenuItem>
              <MenuItem value={-1}>To</MenuItem>
            </Select>
          }
          name="sourceType"
          control={control}
          defaultValue={0}
        />
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        startIcon={loading && <CircularProgress size={20} />}
      >
        Save
      </Button>
    </form>
  );
}

export default SourceForm;
