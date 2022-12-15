type NoDataProps = {
	content: string;
};
export const NoData = ({ content }: NoDataProps) => {
	return <div className='mx-auto font-bold font-bold text-2xl'>{content}</div>;
};
