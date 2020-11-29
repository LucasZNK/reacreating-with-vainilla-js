function createStore(reducer, initialState) {
  let state = initialState;
  let updater = () => {};

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    updater();
  };

  const subscribe = (listener) => {
    updater = listener;
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "BURN":
      return {
        ...state,
        caloriesBurned: state.caloriesBurned + 1.42,
        caloriesObjetive: state.caloriesObjetive - 1.42,
      };
      break;
    default:
      return state;
  }
}

const store = createStore(reducer, {
  caloriesBurned: 0,
  caloriesObjetive: 1360563,
});

store.subscribe(() => {
  const { caloriesBurned, caloriesObjetive } = store.getState();
  window.result.textContent = `Burned beam: ${caloriesBurned.toFixed(
    2
  )} calories`;
  window.objetive.textContent = `You are missing 1 ${caloriesObjetive.toFixed(
    4
  )} to burn a pizza and a coke `;
});

const burn = () => {
  store.dispatch({
    type: "BURN",
    payoload: 1.42,
  });
};

window.burn.addEventListener("click", burn);
