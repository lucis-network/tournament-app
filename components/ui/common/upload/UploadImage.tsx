import DocHead from "components/DocHead";
import { useState } from "react";
import AWS from "aws-sdk";
import Image from "next/image";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import profilePic from "../../../../public/favicon.png";

type Props = {
  heigh?: string;
  width?: string;
  parentCallback?: any;
};

const S3_BUCKET = process.env.NEXT_PUBLIC_BUCKET_NAME
  ? process.env.NEXT_PUBLIC_BUCKET_NAME
  : "";
const REGION = process.env.NEXT_PUBLIC_REGION;
const ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

function UploadImage(props: Props) {
  const [url, setUrl] = useState("");
  const handleFileInput = (e: any) => {
    const file = e.target.files[0];
    if (file && file.name) handleUpload(e.target.files[0]);
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
        props.parentCallback(str);
      });
  };

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

        {/* <Upload>
          <Button icon={<UploadOutlined />} >Click to Upload</Button>
        </Upload> */}
        <input
          type="file"
          style={{ color: "white" }}
          onChange={handleFileInput}
        />
        {/* <button onClick={() => handleUpload(selectedFile)}>Upload</button> */}
      </div>
    </>
  );
}

export default UploadImage;
