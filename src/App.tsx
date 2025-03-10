import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { View } from "./components/ui/Layout/View";
import { Provider } from "react-redux";
import { store } from "./store/storeSetup";
import { saveState } from "./store/localStorage";

function App() {
  store.subscribe(() => {
    saveState(store.getState().auth.token);
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <View />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
