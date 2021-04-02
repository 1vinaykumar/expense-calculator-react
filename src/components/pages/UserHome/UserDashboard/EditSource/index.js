import { Grid, Typography } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { store, useAPI, actionTypes } from "../../../../../state";
import { actionHelper } from "../../../../utilities/stateUtilities";
import SourceForm from "../../Sources/SourceForm";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object({
  name: Yup.string().required().min(3),
  description: Yup.string().min(3),
  amount: Yup.string().required(),
  sourceType: Yup.string().required(),
});

function EditSource() {
  const { sourceId } = useParams();
  const { state, dispatch } = useContext(store);
  const { editSource } = useAPI();

  const source = state.sources.moneySources.find(
    (item) => item._id === sourceId
  );

  const { register, errors, handleSubmit, control } = useForm({
    defaultValues: source,
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    dispatch(actionHelper(actionTypes.RESET_EDIT_SOURCE_STATUS));
  }, []);

  const submitHandler = (values) => {
    editSource(sourceId, values);
  };

  return (
    <Grid container justify="center">
      <SourceForm
        title="Edit Source"
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmitHandler={submitHandler}
        control={control}
        loading={state.sources.edit.loading}
      />
    </Grid>
  );
}

export default EditSource;
