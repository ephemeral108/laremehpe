import { createStore } from "redux";

const initState = {
  device: "unknown",
};

export type storeType = typeof initState;

const rootReducer = (
  state = initState,
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case "app/device":
      return {
        ...state,
        device: action.payload,
      };
  }

  return state;
};

export const store = createStore(rootReducer);
