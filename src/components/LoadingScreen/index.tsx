import withLogger from "../../shared/hoc/withLogger";
import "./style.css";

function LoadingScreen() {
  return (
    <div className="LoadingScreen__container">
      <div className="load-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

const LoggedLoadingScreen = withLogger(LoadingScreen);

export default LoggedLoadingScreen;
