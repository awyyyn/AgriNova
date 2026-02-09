import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { PlantAnalysis } from "@/types";

interface TypeDropdownProps {
	type: PlantAnalysis["type"] | "all";
	setType: (type: PlantAnalysis["type"] | "all") => void;
}

export default function TypeDropdown({ type, setType }: TypeDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant="outline">Type</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-32">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
					<DropdownMenuRadioGroup
						value={type}
						onValueChange={(v) => setType(v as PlantAnalysis["type"])}>
						<DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="fruit">Fruit</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="vegetable">
							Vegetable
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="plant">Plant</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="unknown">
							Unknown
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
