import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Routes/AppRouter";

export const App = () => (
  <BrowserRouter>
    <AppRouter/>

  </BrowserRouter>
);

export default App;