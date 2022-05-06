import { Button } from "antd";
import { useState, useCallback } from "react";

export type StepModalTournament = "step-1" | "step-2" | "step-3" | "step-4";

const UseTeamModal = (team: any) => {
	const [show, setShow] = useState<boolean>(false);
	const [step, setStep] = useState<StepModalTournament>("step-1");

	const handleOpenModal = useCallback(() => {
		setShow(true);
	}, []);

	const handleChangeStep = (step: StepModalTournament) => {
		setStep(step);
	};

	const stepConfiguration = (step: StepModalTournament) => {
		const stepModifier = {
			["step-1"]: {
				titleModal: "Join step 1: Choosing team",
				description: (
					<p>
						Select a valid team to join: <br />
					</p>
				),
			},
			["step-2"]: {
				titleModal: "Join step 1: Choosing team",
				description: <Button>123</Button>,
			},
			["step-3"]: {
				titleModal: "Join step 1: Choosing team",
				description: <Button>123</Button>,
			},
			["step-4"]: {
				titleModal: "Join step 1: Choosing team",
				description: <Button>123</Button>,
			},
		};

		return stepModifier[step];
	};

	return {
		step,
		show,
		handleOpenModal,
		handleChangeStep,
		stepConfiguration,
	};
};

export default UseTeamModal;
