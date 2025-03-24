import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import Navigation from "../Navigation/Navigation.jsx";
// import HomePage from "../../pages/HomePage/HomePage.jsx";
import "./App.css";
// import MoviesPage from "../../pages/MoviesPage/MoviesPage.jsx";
// import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage.jsx";
// import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.jsx";
// import MovieCast from "../MovieCast/MovieCast.jsx";
// import MovieReviews from "../MovieReviews/MovieReviews.jsx";
const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);
const MovieCast = lazy(() => import("../MovieCast/MovieCast.jsx"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews.jsx"));

const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage.jsx"));
export default function App() {
  return (
    <section className="section">
      <Navigation />
      <Suspense fallback={"Loading movie..."}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </section>
  );
}
