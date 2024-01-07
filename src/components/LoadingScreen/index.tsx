import withLogger from "../../shared/hoc/withLogger";
import "./style.css";

function LoadingScreen() {
  return <div className="LoadingScreen__container">Loading...</div>;
}

const LoggedLoadingScreen = withLogger(LoadingScreen);

export default LoggedLoadingScreen;
