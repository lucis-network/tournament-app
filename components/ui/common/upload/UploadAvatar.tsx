import DocHead from "components/DocHead";
import { useState } from "react";
import AWS from "aws-sdk";

type Props = {
  heigh?: string;
  width?: string;
  parentCallback?: any;
  errorCallback?: any;
  value?: string;
  className?: string;
  inputClass?: string;
  innerImageClass?: string;
  description?: string;
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

function UploadAvatar(props: Props) {
  const [url, setUrl] = useState("");
  const handleFileInput = (e: any) => {
    const file = e.target.files[0];
    if (
      file &&
      ["image/jpeg", "image/png", "image/gif", "image/jpg"].includes(file.type)
    ) {
      handleUpload(e.target.files[0]);
    } else {
      props.parentCallback("");
    }
  };

  const handleUpload = async (file: any) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
      ContentType: file.type,
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

      <div className={props.className}>
        <div className="text-white">
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpeg"
            className={props.inputClass}
            onChange={handleFileInput}
            name="upload"
          />
          {props.description && (
            <p className="mb-0 mt-2">{props.description}</p>
          )}
        </div>

        {url ? (
          <div className={props.innerImageClass}>
            <img
              src={url}
              alt="Picture of the author"
              style={{
                objectFit: "cover",
                aspectRatio: `${props.width} / ${props.heigh}`,
              }}
            />
          </div>
        ) : (
          <div className={props.innerImageClass}>
            <img
              src="/assets/default.jpg"
              alt="Default images"
              style={{
                objectFit: "cover",
                aspectRatio: `${props.width} / ${props.heigh}`,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default UploadAvatar;
