import {
  Divider,
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

function TabDetails({ name, amount, color, sourceType }) {
  const history = useHistory();

  return (
    <Button
      fullWidth
      onClick={() => history.push(`/user/sources/${sourceType}`)}
      style={{ borderRadius: 25 }}
    >
      <Card variant="outlined" style={{ width: "100%", borderRadius: 25 }}>
        <CardContent style={{ textAlign: "center", paddingBlock: 10 }}>
          <Typography
            variant="h5"
            style={{
              color: color,
              fontWeight: "bold",
              paddingBottom: "0.3rem",
            }}
          >
            {amount}
          </Typography>
          <Divider variant="middle" />
          <Typography
            variant="subtitle1"
            style={{
              fontWeight: "bold",
              paddingTop: "0.3rem",
            }}
          >
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Button>
  );
}

export default TabDetails;
