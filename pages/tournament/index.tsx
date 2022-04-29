import DocHead from "components/DocHead";
import { useState } from "react";
import AWS from "aws-sdk";
import Image from "next/image";

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

function Tournament(props: Props) {
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

      <div className="pt-28 min-h-screen">
        <input type="file" onChange={handleFileInput} />
        <button onClick={() => handleUpload(selectedFile)}>Upload to S3</button>
        {url ? (
          <Image
            src={url}
            alt="Picture of the author"
            width="350px"
            height="300px"
            layout="responsive"
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Tournament;
