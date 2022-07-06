import { store } from "../store";
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TIndexActions } from "../actions";
import { TRouterActions } from "../actions/router";
import { TWsActions } from "../actions/wsActions";
import { rootReducer } from "../reducers";

export type TApplicationActions = TIndexActions | TRouterActions | TWsActions

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;