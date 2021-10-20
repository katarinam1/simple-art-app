import { useDispatch, useSelector } from "react-redux";
import classes from "./ArtistWork.module.css";
import { fetchPainting, performSearch } from "../store/search-actions";

const ArtistWork = () => {
  const dispatch = useDispatch();
  const nextCallArtist = useSelector((state) => state.search.nextCallArtist);
  const prevCallArtist = useSelector((state) => state.search.prevCallArtist);
  const artistResults = useSelector((state) => state.search.artistResults);

  let arrays = [],
    size = artistResults.length < 9 ? 1 : 3;

  const handlePage = (type) => {
    if (type === "next") {
      dispatch(performSearch(null, null, null, nextCallArtist));
    }
    if (type === "prev") dispatch(performSearch(null, null, null, prevCallArtist));
  };

  for (let i = 0; i < artistResults.length; i += size) arrays.push(artistResults.slice(i, i + size));
  return (
    <div className={classes.artwork}>
      <div className={classes.arrows}>
        <button onClick={() => handlePage("prev")} className={classes.arrow}>
          &larr;
        </button>
        <button onClick={() => handlePage("next")} className={classes.arrow}>
          &rarr;
        </button>
      </div>
      <div className={classes.row}>
        {[...Array(arrays.length)].map((_column, i) => (
          <div className={classes.column}>
            {arrays[i].map((record) => (
              <img
                onClick={() => {
                  dispatch(fetchPainting(record.id));
                }}
                className={classes.art}
                src={record.primaryimageurl}
                alt="p"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistWork;
