import { Suspense } from "react";
import "./App.css";
import PostDetails from "./components/PostDetails";
import PostList from "./components/PostList";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import ErrorBoundary from "./shared/hoc/errorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/post/:id" element={<PostDetails />} />
          </Routes>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
