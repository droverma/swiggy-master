import { createStore , applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootred from "./component/consumer/MenuPage/Redux/reducer";



const store = createStore(rootred, applyMiddleware(thunk));

export default store;