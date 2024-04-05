import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => {
  return {
    boxContainer: {
      display: "flex",
      marginTop: "10px",
      flexWrap: "wrap",
    },
    box: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "3px",
      marginRight: "3px",
    },
    successBox: {
      width: "25px",
      height: "25px",
      borderRadius: token.borderRadius,
      background: token.colorSuccess,
      border: "1px solid",
      borderColor: token.colorSuccessBorder,
    },
    loadingBox: {
      width: "25px",
      height: "25px",
      borderRadius: token.borderRadius,
      background: token.colorBgContainerDisabled,
      border: "1px solid",
      borderColor: token.colorBorder,
    },
  };
});
