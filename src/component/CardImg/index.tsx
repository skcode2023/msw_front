import Style from "./Style";
// import imgB from "@img/nft-img-blue.png";
// import imgG from "@img/nft-img-green.png";
import { useRef } from "react";

/** 通过参数返回img图片标签 */
export default function CardImg({ data }: { data?: NFTCard }) {
  const imgBody = useRef<HTMLImageElement>(null);
  return (
    <Style
      src={
        data?.img ||
        `https://mountainseaworld.on.fleek.co/nft/image/${data?.id}.png`
      }
      alt=""
      ref={imgBody}
      onError={() => {
        if (imgBody.current) {
          imgBody.current.onerror = null;
          imgBody.current.src =
            "https://mountainseaworld.on.fleek.co/nft/image/0.png";
        }
      }}
    />
  );
}
