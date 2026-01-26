import { Text } from "react-native";
import ScrollViewLayout from "../../layouts/scrollview-layout";
import { Card } from "@src/components/ui/card";
import { Heading } from "@src/components/ui/heading";
import { Grid, GridItem } from "@src/components/ui/grid";
import { ChartLine, Scan, Shield } from "lucide-react-native";
import { Button, ButtonText } from "@src/components/ui/button";
import { router } from "expo-router";

export default function HomeScreen() {
	return (
		<ScrollViewLayout>
			<Heading size="3xl">Welcome back</Heading>
			<Text className="  text-lg px-2 mb-2 leading-relaxed tracking-wide">
				Protect your plants with AI-powered pest detection
			</Text>

			<Card size="lg" className="rounded-2xl bg-primary-500  mb-4 ">
				<Heading className="text-white">Quick Scan</Heading>
				<Text className="text-white">
					Detect pest instantly and get treatment recommendations.
				</Text>
				<Button
					onPress={() => router.push("/modal")}
					className="bg-white mt-3 rounded-xl max-w-[150px]">
					<ButtonText className="text-primary-500">Start Scan</ButtonText>
				</Button>
			</Card>

			<Card className="shadow-sm mb-4">
				<Text className="text-xl text-[#41B249] font-medium">
					How it works?
				</Text>
				<Text className="text-[#41B249]  text-lg  leading-relaxed tracking-wide">
					Upload an image from the farm. Agrinova will analyze it and detect any
					pests, providing severity levels and treatment recommendations.
				</Text>
			</Card>

			<Heading size="2xl" className="mb-2">
				Your stats
			</Heading>

			<Grid
				className="gap-5"
				_extra={{
					className: "grid-cols-2",
				}}>
				<GridItem _extra={{ className: "" }}>
					<Card size="lg" className="bg-primary-500">
						<Scan size={32} color="#FFF" />
						<Text className="mt-4 text-white font-medium text-lg">
							Total Scans
						</Text>
						<Text className="text-white">25</Text>
					</Card>
				</GridItem>
				<GridItem _extra={{ className: "" }}>
					<Card size="lg" className="bg-primary-500">
						<ChartLine size={32} color="#FFF" />
						<Text className="mt-4 text-white font-medium text-lg">
							Success Rate
						</Text>
						<Text className="text-white">99.99%</Text>
					</Card>
				</GridItem>
				<GridItem _extra={{ className: "" }}>
					<Card size="lg" className="bg-primary-500">
						<Shield size={32} color="#FFF" />
						<Text className="mt-4 text-white font-medium text-lg">
							Pest Found
						</Text>
						<Text className="text-white">25</Text>
					</Card>
				</GridItem>
				<GridItem _extra={{ className: "" }} />
			</Grid>
		</ScrollViewLayout>
	);
}
