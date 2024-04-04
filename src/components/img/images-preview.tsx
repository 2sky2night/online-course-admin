import {
  CloseCircleOutlined as CloseIcon,
  LeftCircleOutlined as LeftIcon,
  RightCircleOutlined as RightIcon,
} from "@ant-design/icons";
import { FormattedMessage } from "@umijs/max";
import { Button, Spin } from "antd";
import { createStyles } from "antd-style";
import { useEffect,useMemo, useRef, useState } from "react";
import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";

import { staticServerUrl } from "@/config";
import { IsAbsolutePath } from "@/constants";

interface Props {
  images: string[];
}

const maskStyle =
  "position: fixed;z-index: 100;backdrop-filter: blur(5px);background: rgb(0,0,0,.5);inset: 0;display: flex;align-items: center;justify-content: center";

const useStyles = createStyles(({ token }) => {
  return {
    main: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "relative",
      userSelect: "none",
      padding: "0 20px",
    },
    closeBtn: {
      position: "absolute",
      right: "10px",
      top: "10px",
    },
    imgContainer: {
      width: "80vw",
      height: "80vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "contain",
      },
    },
    icon: {
      fontSize: "30px",
      cursor: "pointer",
    },
    disabled: {
      color: token.colorTextDisabled,
      cursor: "not-allowed !important",
    },
    text: {
      color: "#fff",
      position: "absolute",
      bottom: "20px",
      right: "50%",
      transform: "translateX(-50%)",
    },
  };
});

/**
 * 多图片预览画布
 */
function Previews({ images, handleClose }: { images: string[]; handleClose: () => void }) {
  // 样式
  const { styles } = useStyles();
  // 当前预览的图片索引
  const [index, setIndex] = useState(0);
  // 加载中
  const [loading, setLoading] = useState(false);
  // 图片ref
  const imgRef = useRef<HTMLImageElement | null>(null);
  // 格式化后的图片列表
  const formatImages = useMemo(() => {
    return images.map((item) => {
      return IsAbsolutePath.test(item) ? staticServerUrl + item : item;
    });
  }, [images]);
  // 当前选择的图片
  const currentUrl = useMemo(() => {
    return formatImages.find((_, i) => i === index);
  }, [index]);
  // 第几张的文本
  const text = useMemo(() => {
    return `${index + 1} / ${images.length}`;
  }, [index]);
  // 上一张
  const handlePre = () => {
    if (index > 0) {
      setIndex((v) => v - 1);
    }
  };
  // 下一张
  const handleNext = () => {
    if (index < images.length - 1) {
      setIndex((v) => v + 1);
    }
  };
  // 绑定事件
  useEffect(() => {
    imgRef.current?.addEventListener("load", () => {
      setLoading(false);
    });
  }, []);
  // 图片更新就设置加载状态
  useEffect(() => {
    setLoading(true);
    if (imgRef.current?.complete) {
      setLoading(false); // 若图片缓存过，就设置加载态
    }
  }, [index]);
  return (
    <>
      <div className={styles.closeBtn}>
        <CloseIcon onClick={handleClose} className={styles.icon} />
      </div>
      <div className={styles.main}>
        <LeftIcon
          onClick={handlePre}
          className={index === 0 ? `${styles.icon} ${styles.disabled}` : styles.icon}
        />
        <div className={styles.imgContainer}>
          {loading && <Spin size="large"></Spin>}
          <img
            ref={imgRef}
            src={currentUrl}
            alt="预览的图片"
            style={loading ? { display: "none" } : {}}
          ></img>
        </div>
        <RightIcon
          onClick={handleNext}
          className={
            index === images.length - 1 ? `${styles.icon} ${styles.disabled}` : styles.icon
          }
        />
      </div>
      <div className={styles.text}>{text}</div>
    </>
  );
}

/**
 * 多图片预览的触发器(//TODOimages更新不会导致重新渲染图片)
 */
export default function ImagesPreviews({ images }: Props) {
  const dom = useRef<HTMLDivElement | null>();
  const root = useRef<Root | null>(null);
  const handleClose = () => {
    window.document.body.style.overflow = "auto";
    const { current: domInst } = dom;
    const { current: inst } = root;
    if (domInst && inst) {
      inst.unmount(); // 卸载react挂载的视图
      domInst.remove(); // 移除dom节点
      dom.current = null;
      root.current = null;
    }
  };
  const handleOpen = () => {
    dom.current = window.document.createElement("div");
    dom.current.setAttribute("style", maskStyle);
    window.document.body.appendChild(dom.current);
    window.document.body.style.overflow = "hidden";
    root.current = createRoot(dom.current);
    root.current.render(<Previews images={images} handleClose={handleClose} />);
  };
  // 组件被卸载时清空实例，并卸载渲染的视图
  useEffect(() => {
    return handleClose;
  }, []);
  return (
    <Button onClick={handleOpen} type="link">
      <FormattedMessage id="global.info" defaultMessage="查看" />
    </Button>
  );
}
