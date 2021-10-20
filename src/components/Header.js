import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import { useState } from "react";
import { performSearch } from "../store/search-actions";
import SearchItem from "./SearchItem";
import Loading from "./Loading";

const Header = () => {
  const [inputValue, changeInput] = useState("");
  const dispatch = useDispatch();
  const results = useSelector((state) => state.search.searchResults);
  const paintingPreview = useSelector((state) => state.search.paintingPreview);
  const paintings = useSelector((state) => state.painting.paintings);
  const currentPainting = useSelector((state) => state.painting.currentPainting);
  const next = useSelector((state) => state.search.nextCall);
  const prev = useSelector((state) => state.search.prevCall);
  const showResults = useSelector((state) => state.ui.showSearch);

  const searchHandler = (event) => {
    event.preventDefault();
    dispatch(uiActions.toggle(true));
    dispatch(performSearch(inputValue));
  };

  const inputHandler = (event) => {
    dispatch(uiActions.toggle(false));
    changeInput(event.target.value);
  };

  const mouseLeaveHandler = () => {
    dispatch(uiActions.toggle(false));
  };

  const handlePage = (type) => {
    if (type === "next") {
      dispatch(performSearch(null, null, next));
    }
    if (type === "prev") dispatch(performSearch(null, null, prev));
  };

  const exploreArtistHandler = () => {
    if (paintingPreview) dispatch(performSearch(null, paintingPreview.people[0].name, null));
    else dispatch(performSearch(null, paintings[currentPainting].people[0].name), null);
  };

  return (
    <div className={classes.header}>
      {showResults && (
        <div className={classes.dropdown} onMouseLeave={mouseLeaveHandler}>
          {!results.length ? (
            <Loading />
          ) : (
            <div className={classes["dropdown-content"]}>
              <div className={classes.arrows}>
                {prev ? (
                  <button
                    onClick={() => {
                      handlePage("prev");
                    }}
                    className={classes.arrow}
                  >
                    &larr;
                  </button>
                ) : (
                  <button
                    disabled
                    onClick={() => {
                      handlePage("prev");
                    }}
                    className={classes.arrow}
                  >
                    &larr;
                  </button>
                )}
                {next ? (
                  <button
                    onClick={() => {
                      handlePage("next");
                    }}
                    className={classes.arrow}
                  >
                    &rarr;
                  </button>
                ) : (
                  <button
                    disabled
                    onClick={() => {
                      handlePage("next");
                    }}
                    className={classes.arrow}
                  >
                    &rarr;
                  </button>
                )}
              </div>
              {results.map((result) => (
                <SearchItem key={result.id} item={result} />
              ))}
            </div>
          )}
        </div>
      )}
      <form>
        <input onChange={inputHandler} className={classes.input} type="text" id="fname" name="search" placeholder="Painting title" />
        <button onClick={searchHandler} className={classes.magnifier} type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
      <div onClick={exploreArtistHandler} className={classes.artist}>
        Explore artist
      </div>
      {/* <p className={classes.favorites}>Favorites</p> */}
    </div>
  );
};

export default Header;
