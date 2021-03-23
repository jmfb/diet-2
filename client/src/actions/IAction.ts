interface IAction<Type extends string, Payload> {
	type: Type;
	payload: Payload;
}

export default IAction;
