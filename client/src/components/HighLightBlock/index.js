// Styles
import classNames from "classnames";
import styles from "./HighLightBlock.module.scss";


const HighLightBlock = ({width = 50, height = 50, left, right}) => {

  const place = {
    width: `${width}%`,
    height: `calc(${height}% - 5rem)`,
    left: `${left}%`,
    right: `${right}%`,
  }

  return (
    <div className={classNames(styles["highlight-block"])}  style={place}></div>
  );
};

export default HighLightBlock;


