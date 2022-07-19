import DocHead from "components/DocHead";

type Props = {
	url: string;
	inputKey: string;
	reset: boolean;
	heigh?: string;
	width?: string;
	className?: string;
	inputClass?: string;
	innerImageClass?: string;
	description?: string;
	handleFileInput: any;
};

function UploadAvatar(props: Props) {
	return (
		<>
			<DocHead />

			<div className={props.className}>
				<div className="text-white">
					<input
						id="upload-avatar"
						key={props.inputKey || ""}
						type="file"
						accept="image/png, image/jpeg, image/jpeg"
						className={props.inputClass}
						onChange={props.handleFileInput}
						name="upload"
					/>
					{props.description && (
						<p className="mb-0 mt-2">{props.description}</p>
					)}
				</div>

				{props.url ? (
					<div className={props.innerImageClass}>
						<img
							src={props.url}
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
