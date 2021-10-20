import { useDispatch } from "react-redux";
import { fetchPainting } from "../store/search-actions";
import classes from "./SearchItem.module.css";

const SearchItem = ({ item }) => {
  const dispatch = useDispatch();

  const previewHandler = () => {
    dispatch(fetchPainting(item.id));
  };
  return (
    <div className={classes.content} onClick={previewHandler}>
      <div className={classes.container}>
        <div className={classes.image}>
          <img className={classes.painting} src={item.primaryimageurl} alt="painting" />
        </div>
        <div className={classes.name}>
          {item.title.slice(0, 50)} ({item.people ? item.people[0].displayname : "Unknown Artist"})
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
