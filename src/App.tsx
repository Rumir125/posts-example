import { Suspense } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import LoadingScreen from "./components/LoadingScreen";
import ErrorBoundary from "./shared/hoc/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <AppRoutes />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
