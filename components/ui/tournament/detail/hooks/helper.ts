import { isEmpty } from "lodash";
import { Item } from "./useTeamModal";

export const dataTeam = (team?: Item[], isInit?: boolean) =>
	team?.map((member) => ({
		...member,
		prize: isInit ? +(100 / (team?.length || 1)).toFixed(2) : member.prize,
		game_member_id: member.game_member_id,
	})) || [];

export const getValueInObject = (array: any[], key: string): any[] => {
	if (Array.isArray(array)) {
		return array.reduce((acc, value) => {
			acc.push(value[key]);
			return acc;
		}, []);
	}
	return [];
};

export const checkEmptyArrayValue = (array: any[], key: string): boolean => {
	if (Array.isArray(array) && !isEmpty(array)) {
		const values = getValueInObject(array, key);

		return !values.every((item) => !!item);
	}
	return !!array;
};

export const checkTotalPercent = (array: any[], key: string) => {
	const total = getValueInObject(array || [], key).reduce(
		(acc: number, cur: number) => acc + cur,
		0
	);
	return total !== 100;
};
