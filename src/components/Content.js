import classes from "./Content.module.css";
import PaintingDetails from "./PaintingDetails";
import ArtistDetails from "./ArtistDetails";
import { paintingActions } from "../store/painting-slice";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../store/search-slice";
import { Fragment, useState } from "react";
import ArtistWork from "./ArtistWork";

const Content = () => {
  const dispatch = useDispatch();
  const paintings = useSelector((state) => state.painting.paintings);
  const currentPainting = useSelector((state) => state.painting.currentPainting);
  const paintingPreview = useSelector((state) => state.search.paintingPreview);
  const artistPreview = useSelector((state) => state.search.artistResults.length);
  const [showPopup, setShowPopup] = useState(null);

  const nextHandler = () => {
    if (currentPainting === paintings.length - 1) dispatch(paintingActions.changePage({ type: "next" }));
    else dispatch(paintingActions.changePainting({ type: "inc" }));
  };

  const prevHandler = () => {
    if (currentPainting === 0) dispatch(paintingActions.changePage({ type: "prev" }));
    else dispatch(paintingActions.changePainting({ type: "dec" }));
  };

  const switchViewHandler = () => {
    if (paintingPreview) dispatch(searchActions.clearPainting());
    else dispatch(searchActions.clearArtist());
  };
  const painting = paintingPreview ? paintingPreview : paintings[currentPainting];

  return (
    <div className={classes.row}>
      <div className={classes["column-left"]}>
        {artistPreview && !paintingPreview ? (
          <ArtistDetails switchViewHandler={switchViewHandler} artist={painting.people[0]} />
        ) : (
          paintings.length && <PaintingDetails artist={painting.people[0]} nextHandler={nextHandler} prevHandler={prevHandler} currentPainting={currentPainting} painting={painting} preview={paintingPreview} switchViewHandler={switchViewHandler} />
        )}
      </div>
      <div className={classes["column-right"]}>
        {artistPreview && !paintingPreview ? (
          <ArtistWork />
        ) : (
          <div className={classes.container}>
            <div className={classes.frame}>
              {paintings.length && painting && (
                <figure>
                  <img className={classes.painting} src={painting.primaryimageurl} alt="sunflowers" />
                  <div className={classes.colors}>
                    {painting.colors.map((el, i) => (
                      <Fragment>
                        <div
                          onMouseOver={() => {
                            setShowPopup(i);
                          }}
                          onMouseLeave={() => {
                            setShowPopup(null);
                          }}
                          key={Math.random()}
                          style={{ backgroundColor: el.color }}
                          className={classes.color}
                        ></div>
                        {i === showPopup && (
                          <div key={Math.random()} className={classes.popup}>
                            <span className={classes["popuptext"]}>{el.color}</span>
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </figure>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
