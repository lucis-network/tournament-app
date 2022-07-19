import { useEffect, useState } from "react";
import AWS from "aws-sdk";

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

const UseUploadAvatar = (
	parentCallback: (childValue: string, file?: any) => void,
	reset?: boolean
) => {
	const randomString = Math.random().toString(36);
	const [url, setUrl] = useState<string>("");
	const [inputKey, setInputKey] = useState("");

	const handleFileInput = (e: any) => {
		const file = e.target?.files?.[0];
		if (
			file &&
			["image/jpeg", "image/png", "image/gif", "image/jpg"].includes(file?.type)
		) {
			handleUpload(file);
		} else {
			setUrl("");
			parentCallback("");
			resetsFileInput();
		}
	};

	const resetsFileInput = () => {
		setInputKey(randomString);
	};

	const handleUpload = async (file: any) => {
		const params = {
			ACL: "public-read",
			Body: file,
			Bucket: S3_BUCKET,
			Key: 'tournaments/' + file.name,
			ContentType: file.type,
		};

		myBucket
			.putObject(params)
			.on("httpUploadProgress", (evt, response) => {
				// console.log("evt", evt);
				// console.log("response", response);
			})
			.send((err, data) => {
				var s3url = myBucket.getSignedUrl("getObject", { Key: params.Key });
				const str = s3url.split("?")[0];
				setUrl(str);
				parentCallback(str, file);
			});
	};

	useEffect(() => {
		reset && handleFileInput({ target: { files: null } });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reset]);

	return {
		url,
		inputKey,
		parentCallback,
		handleFileInput,
	};
};

export default UseUploadAvatar;
