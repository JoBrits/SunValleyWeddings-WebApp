// Styles
import classNames from "classnames";
import styles from "./Logo.module.scss";

const Logo = ({section, textAlign, headingMainSize, headingMainColor, headingMainHeight, headingMainMargin, headingSectionSize, headingSectionColor}) => {

  const styleAdjust = {
    textAlign: `${textAlign}`,
  }
  const headingMainAdjust = {
    fontSize: `${headingMainSize}`,
    lineHeight: `${headingMainHeight}`,
    marginBottom: `${headingMainMargin}`,
    color: `${headingMainColor}`
  }

  const headingSectionAdjust = {
    fontSize: `${headingSectionSize}`,
    color: `${headingSectionColor}`
  }
 
  return (
    <div style={styleAdjust} className={classNames(styles.logo)}>
      <h2 style={headingMainAdjust}>Sun Valley</h2>
      <h3 style={headingSectionAdjust}>{section}</h3>
    </div>
  );
};

export default Logo;
