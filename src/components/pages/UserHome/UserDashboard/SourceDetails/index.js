import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { useContext } from "react";
import { Redirect, useParams } from "react-router";
import { store } from "../../../../../state";
import SourceCard from "./SourceCard";

const sourceTypes = {
  available: 0,
  moneyFrom: 1,
  moneyTo: -1,
  all: 2,
};

function SourceDetails() {
  const { state } = useContext(store);
  const { sourceType } = useParams();
  const sources =
    (sourceTypes[sourceType] === 2
      ? state.sources.moneySources
      : state.sources.moneySources.filter(
          (item) => item.sourceType === sourceTypes[sourceType]
        )) || [];

  return Object.keys(sourceTypes).includes(sourceType) ? (
    sources.length > 0 ? (
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" style={{ marginBottom: 20 }}>
          Sources
        </Typography>
        <Grid container justify="center" spacing={2}>
          {sources.map((source) => (
            <SourceCard source={source} key={source._id} />
          ))}
        </Grid>
      </Container>
    ) : (
      <Typography align="Center" variant="h5">
        No Sources
      </Typography>
    )
  ) : (
    <Redirect to="/user" />
  );
}

export default SourceDetails;
