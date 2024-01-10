import { Suspense } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import LoadingScreen from "./components/LoadingScreen";
import ErrorBoundary from "./shared/hoc/ErrorBoundary";
import { PostCommentsProvider } from "./shared/context/PostCommentsContext";

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <PostCommentsProvider>
          <AppRoutes />
        </PostCommentsProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
