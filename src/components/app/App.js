import React from "react"; // импорт библиотеки
import ReactDOM from "react-dom";
import styles from '../../pages/styles.module.css'
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
import { NotFound } from "../../pages/not-found";
import { Feed } from "../../pages/feed";
import { ProfileOrders } from "../../pages/orders";
import { Order } from "../../pages/order";
import { WS_CONNECTION_START } from "../../services/actions/wsActions";

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

  const messages = useSelector(store => store.wsReducer)

  const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all')
  ws.onerror = event => console.log(event)
  
  React.useEffect(() => {
    dispatch({type: WS_CONNECTION_START})
  }, [])

  React.useEffect(() => {
    document.title = "react burger";
    dispatch(getUserInfo());
  }, [dispatch, isAuth]);

  React.useEffect(() => {
    if (!items.length) {
      dispatch(getIngredients())
    }
  }, [dispatch, items])


  return (
    <>
      {itemsRequest && <span>Загрузка<span className={styles.loading}>...</span></span>}
      {itemsFailed && "Произошла ошибка"}
      {!itemsRequest && !itemsFailed && items.length && (
        <>
        <AppHeader background={background} />
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
              <ProtectedRoute anonymus={true} reset={true}>
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
            }>
              <Route path="orders" element={<ProfileOrders />} />
          </Route>
          <Route path="/order" element={<Order />} />
          <Route
            path="/ingredients/:id"
            element={
              <>
              <Modal black={true} title={"Детали ингредиента"}>
                <IngredientDetails />
              </Modal>
              </>
            }
          />
          <Route path="/feed" element={<Feed />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        </>
      )}
      {background && items.length && (
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
