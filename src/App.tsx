import { Suspense } from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import LoadingScreen from "./components/LoadingScreen";
import ErrorBoundary from "./shared/hoc/errorBoundary";
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
