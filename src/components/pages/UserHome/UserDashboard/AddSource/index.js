import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { store, useAPI, actionTypes } from "../../../../../state";
import { actionHelper } from "../../../../utilities/stateUtilities";
import SourceForm from "../../Sources/SourceForm";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required().min(3),
  description: Yup.string().min(3),
  amount: Yup.string().required(),
  sourceType: Yup.string().required(),
});

function AddSource() {
  const { state, dispatch } = useContext(store);
  const { register, errors, handleSubmit, control } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const { addSource } = useAPI();

  useEffect(() => {
    dispatch(actionHelper(actionTypes.RESET_ADD_SOURCE_STATUS));
  }, []);

  const submitHandler = (values) => {
    addSource(values);
  };

  return (
    <Grid container justify="center">
      <SourceForm
        title="Add Source"
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmitHandler={submitHandler}
        control={control}
        loading={state.sources.add.loading}
      />
    </Grid>
  );
}

export default AddSource;
