import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => {
  return {
    container: {
      padding: "20px 10px",
      color: token.colorText,
      fontSize: token.sizeMD,
    },
  };
});
