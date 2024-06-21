import { useLayoutEffect, useRef, useState } from "react";

import UploadIcon from "@/assets/upload.svg?react";
import { useCanvas } from "@/store";

import { Tool } from "../Tool";

export const DownloadTool = () => {
  const { fabric } = useCanvas();

  const linkRef = useRef<HTMLAnchorElement>(null);
  const [linkUrl, setLinkUrl] = useState("");

  useLayoutEffect(() => {
    if (linkUrl) {
      linkRef.current?.click();
      setLinkUrl("");
    }
  }, [linkUrl, linkRef]);

  return (
    <div>
      <a ref={linkRef} href={linkUrl} download="canvas-image.png"></a>
      <Tool
        icon={<UploadIcon />}
        onClick={() => setLinkUrl(fabric.toDataURL())}
        disabled={fabric.isEmpty()}
        title={"Определить букву"}
        type="submit"
      />
    </div>
  );
};
