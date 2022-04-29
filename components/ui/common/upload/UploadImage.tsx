import DocHead from "components/DocHead";
import { useEffect, useState } from "react";
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
};

const S3_BUCKET = process.env.NEXT_PUBLIC_BUCKET_NAME
  ? process.env.NEXT_PUBLIC_BUCKET_NAME
  : "";
const REGION = process.env.NEXT_PUBLIC_REGION;
const ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY;
const LINK_URL =
  "https://image-upload-s3-demo.s3.ap-southeast-1.amazonaws.com/";
AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export default observer(function UploadImage(props: Props) {
  const [url, setUrl] = useState("");
  const handleFileInput = (e: any) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      handleUpload(e.target.files[0]);
    } else {
    }
  };

  const handleUpload = async (file: any) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
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
    console.log("TournamentStore.cover", TournamentStore.cover);
    if (props.value == "cover" && TournamentStore.cover) {
      setUrl(TournamentStore.cover);
    }

    if (props.value === "thumbnail" && TournamentStore.thumbnail)
      setUrl(TournamentStore.thumbnail);
  }, [TournamentStore.cover || TournamentStore.thumbnail]);

  return (
    <>
      <DocHead />

      <div className="">
        {url ? (
          <img
            src={url}
            alt="Picture of the author"
            style={{
              objectFit: "cover",
              aspectRatio: `${props.width} / ${props.heigh}`,
              marginBottom: "10px",
            }}
          />
        ) : (
          <img
            src="/assets/default.jpg"
            alt="Default images"
            style={{
              objectFit: "cover",
              aspectRatio: `${props.width} / ${props.heigh}`,
              marginBottom: "10px",
            }}
          />
        )}
        <p
          style={{
            color: "white",
            textAlign: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {url.slice(LINK_URL.length, url.length)}
        </p>
        <input
          //style={{ display: "none" }}
          type="file"
          style={{ color: "transparent" }}
          onChange={handleFileInput}
          accept=".jpg, .jpeg, .png"
          title=""
        ></input>

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
