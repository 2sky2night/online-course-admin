import { createStyles } from "antd-style";

import { Image } from "@/components";
import { VideoItem } from "@/types";

const useStyles = createStyles(({ token }) => {
  return {
    container: {
      color: token.colorText,
      display: "flex",
      alignItems: "center",
    },
    text: {
      fontSize: token.sizeSM,
      marginLeft: "10px",
    },
  };
});

export default function VideoSelectLabel({ video }: { video: VideoItem }) {
  const { styles } = useStyles();
  return (
    <div className={styles.container}>
      <Image src={video.video_cover} antdProps={{ height: "50px", width: "50px" }}></Image>
      <div className={styles.text}>{video.video_name}</div>
    </div>
  );
}
