import DocHead from "components/DocHead";
import { useState } from "react";
import AWS from "aws-sdk";
import Image from "next/image";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
//import defaultImage from "/default.jpg";
type Props = {};

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState("");
  const handleFileInput = (e: any) => {
    setSelectedFile(e.target.files[0]);
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
        //setProgress(Math.round((evt.loaded / evt.total) * 100));
        console.log("evt", evt);
        console.log("response", response);
      })
      .send((err, data) => {
        //if (err) console.log("err", err);

        var s3url = myBucket.getSignedUrl("getObject", { Key: params.Key });
        const str = s3url.split("?")[0];
        setUrl(str);
      });
  };

  return (
    <>
      <DocHead />

      <div className="">
        {url ? (
          <Image
            src={url}
            alt="Picture of the author"
            width="200px"
            height="200px"
            layout="responsive"
          />
        ) : (
          <img src="/default.jpg" width="200px" height="200px" alt="" />
        )}

        <Upload>
          <Button icon={<UploadOutlined />} >Click to Upload</Button>
        </Upload>
        <input type="file" onChange={handleFileInput} />
        <button onClick={() => handleUpload(selectedFile)}>Upload</button>
      </div>
    </>
  );
}

export default UploadImage;
