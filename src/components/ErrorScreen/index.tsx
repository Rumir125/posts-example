import withLogger from "../../shared/hoc/withLogger";
import "./style.css";

function ErrorScreen({
  message = "Something went wrong",
}: {
  message?: string;
}) {
  return (
    <div className="Error__wrapper">
      <h1>{message}</h1>
    </div>
  );
}

export default withLogger(ErrorScreen);
