import { Suspense } from "react";
import "./App.css";
import LoadingScreen from "./components/LoadingScreen";
import AppRoutes from "./routes/AppRoutes";
import { CachedFetchProvider } from "./shared/context/CachedFetchContext";
import ErrorBoundary from "./shared/hoc/ErrorBoundary";

// TODO: adjust for mobile use
// TODO: Add localization support
// TODO: Add dark mode support
// TODO: Add prettier config file

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <CachedFetchProvider>
          <AppRoutes />
        </CachedFetchProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
