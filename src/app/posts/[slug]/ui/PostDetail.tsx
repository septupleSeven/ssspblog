"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import 'prismjs/themes/prism-tomorrow.css';
import { useTheme } from "next-themes";
import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";

const EmptyCollection = (props: any) => <></>;

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code),
);

const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation),
);

const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  },
);

const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  },
);

const NextImage = (props: ImageProps) => {
  return (
    <Image {...props} width={700} height={0} style={{width: "auto", height: "auto"}} alt="Post Image"/>
  )
}

const NextLink = (props: LinkProps) => {
  return(
    <Link {...props} />
  )
}

const PostDetail = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("");

  useEffect(() => {
    setCurrentTheme(theme as string)
  }, [theme]);
  
  return (
    <div className={`post_detail__container ${currentTheme} pt-[30px] pb-[50px]`}>
      <NotionRenderer
        darkMode
        recordMap={recordMap}
        forceCustomImages={true}
        components={{
          Code,
          Collection: EmptyCollection,
          Equation,
          Modal,
          Pdf,
          Image: NextImage,
          nextLink: NextLink
        }}
      />
    </div>
  );
};

export default PostDetail;
