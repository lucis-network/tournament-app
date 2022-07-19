import {useEffect, useRef, useState} from "react";
import AWS from "aws-sdk";
import { observer } from "mobx-react";
import TournamentStore from "src/store/TournamentStore";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

type Props = {
  heigh?: string;
  width?: string;
  parentCallback?: any;
  value?: string;
  url?: string;
  className?: string;
};

export const S3_BUCKET = process.env.NEXT_PUBLIC_BUCKET_NAME
  ? process.env.NEXT_PUBLIC_BUCKET_NAME
  : "";
const REGION = process.env.NEXT_PUBLIC_REGION;
const ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY;
const LINK_URL =
  "https://image-upload-s3-demo.s3.ap-southeast-1.amazonaws.com/tournaments/";
AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

export const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export default observer(function UploadImage(props: Props) {
  const [url, setUrl] = useState("");
  const inputUpload = useRef<HTMLInputElement>(null)
  const handleFileInput = (e: any) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file: any) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: 'tournaments/' + file.name,
      ContentType: "image/jpeg",
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt, response) => {
        console.log("evt", evt);
        console.log("response", response);
      })
      .send((err, data) => {
        var s3url = myBucket.getSignedUrl("getObject", { Key: params.Key });
        const str = s3url.split("?")[0];
        setUrl(str);
        props.parentCallback(str, props.value);
      });
  };

  useEffect(() => {
    if (props.value == "cover" && TournamentStore.cover) {
      setUrl(TournamentStore.cover);
    }

    if (props.value === "thumbnail" && TournamentStore.thumbnail)
      setUrl(TournamentStore.thumbnail);
  }, [TournamentStore.cover, TournamentStore.thumbnail]);

  return (
    <>
      <div className={props.className ?? ''}>
        <img
          src={url ? url : '/assets/iconDefaultImg.svg'}
          alt={url ? 'Picture of the author' : 'Default images'}
          style={(props.width && props.heigh) ? {
            aspectRatio: `${props.width} / ${props.heigh}`,
            marginBottom: "10px",
          } : {
            marginBottom: "10px",
          }}
          onClick={() => inputUpload?.current?.click()}
        />
        {url && (
          <p className="file-name">
            {url.slice(LINK_URL.length, url.length)}
          </p>
        )}
        <input
          //style={{ display: "none" }}
          type="file"
          style={{ color: "transparent", display: "none" }}
          onChange={handleFileInput}
          accept=".jpg, .jpeg, .png"
          title=""
          ref={inputUpload}
        />

        {/* <input
          style={{ display: "none" }}
          type="file"
          //style={{ color: "white" }}
          onChange={handleFileInput}
        /> */}
        {/* <button onClick={() => handleUpload(selectedFile)}>Upload</button> */}
      </div>
    </>
  );
});
