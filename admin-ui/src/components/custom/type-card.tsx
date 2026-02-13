export function TypeCard({
	label,
	count,
	color,
}: {
	icon: string;
	label: string;
	count: number;
	color: string;
}) {
	return (
		<div className="space">
			<h2 className="text-center">{label}</h2>
			<div className={`text-2xl  font-bold mb-2 ${color}`}>{count}</div>
		</div>
	);
}
