import { RouterProvider } from "react-router-dom";
import router from "./routers/index.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-dvh">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
