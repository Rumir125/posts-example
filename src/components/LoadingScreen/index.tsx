import withLogger from "../../shared/hoc/withLogger";

function LoadingScreen() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Loading...
    </div>
  );
}

const LoggedLoadingScreen = withLogger(LoadingScreen);

export default LoggedLoadingScreen;
