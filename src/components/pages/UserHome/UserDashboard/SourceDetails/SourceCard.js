import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { useAPI, store } from "../../../../../state";

const colorCodes = {
  0: "#3388FF",
  1: "#33FF54",
  "-1": "#FF4C33",
};

function SourceCard({ source }) {
  const history = useHistory();
  const { state } = useContext(store);
  const { deleteSource } = useAPI();
  const [isSubmitClicked, setSubmitClicked] = useState(false);

  return (
    <Grid item xs={10} sm={5} md={3}>
      <Card
        style={{
          textAlign: "center",
          backgroundColor: colorCodes[source.sourceType],
          borderRadius: 30,
        }}
      >
        <CardContent>
          <Typography variant="h5" style={{ fontWeight: 600 }}>
            {source.amount}
          </Typography>
          <Typography variant="subtitle1">{source.name}</Typography>
          <Typography variant="caption">{source.description}</Typography>
        </CardContent>
        <CardActions>
          <Grid container justify="center">
            <Grid item xs={4}>
              <Button
                onClick={() => history.push(`/user/sources/edit/${source._id}`)}
                variant="contained"
              >
                Edit
              </Button>
            </Grid>
            <Grid item xs={4}>
              {isSubmitClicked && state.sources.delete.loading ? (
                <CircularProgress />
              ) : (
                <Button
                  onClick={() => {
                    setSubmitClicked(true);
                    deleteSource(source);
                  }}
                  variant="contained"
                  color="secondary"
                >
                  Delete
                </Button>
              )}
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default SourceCard;
