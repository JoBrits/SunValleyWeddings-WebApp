const ContentBlock = ({start = 1, end = 12, justifyContent, alignItems, alignContent, children}) => {

  const place = {
    display: "grid",
    gridColumn: `content-col-start ${start} / content-col-end ${end}`, 
    justifyContent: `${justifyContent}`,
    alignItems: `${alignItems}`,
    alignContent: `${alignContent}`,
  }

  return (
    <div style={place}>
      {children}
    </div>
  );
};

export default ContentBlock;


