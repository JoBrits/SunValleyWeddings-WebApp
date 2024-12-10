const Section = ({children, height, padding, id}) => {

  const place = {
    height: `${height}`,
    padding: `${padding}`,
  }

  return (
    <div id={id} className="layout-section" style={place}>
      {children}
    </div>
  );
};

export default Section;


