import React from "react"; // импорт библиотеки
import ReactDOM from "react-dom";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Index } from "../../pages";
import { Login } from "../../pages/login";
import { Register } from "../../pages/register";
import { Forgot } from "../../pages/forgot-password";
import { Reset } from "../../pages/reset-password";
import { Profile } from "../../pages/profile";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions";
import { getUserInfo } from "../../services/actions/router";
import { ProtectedRoute } from "../protecred-route/protected-route";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Modal } from "../modal/modal";
import { AppHeader } from "../app-header/app-header";

export const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();

  const closeModal = React.useCallback(() => navigate(-1), [navigate]);

  const { isAuth } = useSelector((store) => store.routeReducer);
  const { items, itemsRequest, itemsFailed } = useSelector(
    (store) => store.reducer
  );

  React.useEffect(() => {
    document.title = "react burger";
    dispatch(getIngredients());
    dispatch(getUserInfo());
  }, [dispatch, isAuth]);

  return (
    <>
      {itemsRequest && "Загрузка..."}
      {itemsFailed && "Произошла ошибка"}
      {!itemsRequest && !itemsFailed && items.length && (
        <Routes location={background || location}>
          <Route path="/" element={<Index />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute anonymus={true}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute anonymus={true}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute anonymus={true}>
                <Forgot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute anonymus={true}>
                <Reset />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ingredients/:id"
            element={
              <>
              <AppHeader modal={true} />
              <Modal onClose={closeModal} black={true} title={"Детали ингредиента"}>
                <IngredientDetails />
              </Modal>
              </>
            }
          />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <>
                <Modal onClose={closeModal} title={"Детали ингредиента"}>
                  <IngredientDetails />
                </Modal>
              </>
            }
          />
        </Routes>
      )}
    </>
  );
};
