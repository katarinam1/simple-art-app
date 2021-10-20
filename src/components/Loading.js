import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <div>
      <div className={classes.stage}>
        <div className={classes["dot-pulse"]}></div>
      </div>
    </div>
  );
};

export default Loading;
