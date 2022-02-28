const getStyles = () => ({
  subTitle: {
    fontSize: 25,
    padding: "15px",
    marginBottom: "25px",
  },
});

const SubTitle = (props) => {
  const styles = getStyles();

  return <h2 style={styles.subTitle}>{props.text}</h2>;
};

export default SubTitle;