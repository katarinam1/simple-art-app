import { useSelector } from "react-redux";
import classes from "./PaintingDetails.module.css";

const PaintingDetails = ({ currentPainting, painting, artist, prevHandler, nextHandler, preview, switchViewHandler }) => {
  const page = useSelector((state) => state.painting.page);

  const detailClass = painting.labeltext ? classes.details : classes["lowered-details"];
  return (
    <div className={detailClass}>
      <h1 className={classes.title}>{painting.title}</h1>
      <div className={classes.characteristics}>
        Artist: {artist.name} ({artist.displaydate})
      </div>
      <div className={classes.characteristics}>Date: {painting.dated} </div>
      <div className={classes.characteristics}>Technique: {painting.medium} </div>
      <div className={classes.characteristics}>Culture: {painting.culture} </div>
      <div className={classes.description}>{painting.labeltext ? painting.labeltext : "There is no available description for the given painting."}</div>
      <a className={classes.link} href={painting.url}>
        Read more
      </a>
      {!preview && (
        <div>
          {(currentPainting !== 0 || page !== 1) && (
            <button onClick={prevHandler} className={classes["button-prev"]}>
              Previous painting
            </button>
          )}
          <button onClick={nextHandler} className={classes["button-next"]}>
            Next painting
          </button>
        </div>
      )}
      <div></div>
      {preview && (
        <div>
          <button onClick={switchViewHandler} className={classes["button-next"]}>
            Go back
          </button>
        </div>
      )}
    </div>
  );
};

export default PaintingDetails;
