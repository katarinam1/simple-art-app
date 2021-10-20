import classes from "./ArtistDetails.module.css";

const ArtistDetails = ({ artist, switchViewHandler }) => {
  const [bornYear, deathYear] = artist.displaydate.split(" - ");
  return (
    <div className={classes.details}>
      <h1 className={classes.title}>{artist.displayname}</h1>
      <div className={classes.description}>
        {artist.culture} painter born in {bornYear}, in {artist.birthplace} and died in {deathYear} in {artist.deathplace}.
      </div>
      <button onClick={switchViewHandler} className={classes["button-next"]}>
        Go back
      </button>
    </div>
  );
};

export default ArtistDetails;
