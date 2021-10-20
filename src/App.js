import { Fragment, useEffect } from "react";
import Header from "./components/Header";
import { fetchPaintingData } from "./store/painting-actions";
import "./App.css";
import Content from "./components/Content";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.painting.page);

  useEffect(() => {
    dispatch(fetchPaintingData(page));
  }, [page, dispatch]);

  return (
    <Fragment>
      <Header />
      <Content />
    </Fragment>
  );
}

export default App;
