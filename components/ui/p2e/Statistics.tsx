import React, { useEffect } from 'react'
import s from "./p2e.module.sass";
import { Button, Col, Row } from "antd";
import { useQuery } from '@apollo/client';
import { GET_STATISTICS } from 'hooks/p2e/useP2E';
import ConnectWalletStore, {
	nonReactive as ConnectWalletStore_NonReactiveData,
} from "components/Auth/ConnectWalletStore";
import EthersService from "../../../services/blockchain/Ethers";
import { LUCIS } from 'utils/Enum';

interface IProps {
	balance?: { lucisToken: string, lucisPoint: string };
}

const Statistics = (props: IProps) => {
	const { loading, error, data, refetch } = useQuery(GET_STATISTICS, {
		context: {
			endpoint: 'p2e'
		}
	});

	useEffect(() => {

		getLucisBalance();
	}, []);

	useEffect(() => {
		refetch()
	}, [props.balance?.lucisPoint, props.balance?.lucisToken]);

	const [lucisTokenOnChain, setLucisTokenOnChain] = React.useState<number | string>(0);

	const getLucisBalance = async () => {
		const lucisTokenAddress = LUCIS;

		if (ConnectWalletStore_NonReactiveData.web3Provider) {
			const ethersService = new EthersService(
				ConnectWalletStore_NonReactiveData.web3Provider
			);

			const lucisTokenBalance = await ethersService.getBalanceOf(
				ConnectWalletStore.address as string,
				lucisTokenAddress
			);

			setLucisTokenOnChain(lucisTokenBalance.toString());
		}
	}
	return (
		<div className={s.statistics}>
			<Row className={s.statisticsContent}>
				<Col span={8}>
					<h2>Statistics</h2>
				</Col>
				<Col span={8}>
					<h3>{loading ? "--" : data?.getBalance?.lucis_point} LUCIS point</h3>
				</Col>
				<Col span={8}>
					<Row className={s.lucisTokenArea} gutter={[16, 16]}>
						<Col span={24}>Earned: {loading ? "--" : data?.getBalance?.lucis_token} LUCIS Token</Col>
						<Col span={24}><Button type="primary">Claim</Button></Col>
						<Col span={24}>Wallet balance: {lucisTokenOnChain} LUCIS</Col>
					</Row>
				</Col>
			</Row>
		</div>
	)
}

export default Statistics