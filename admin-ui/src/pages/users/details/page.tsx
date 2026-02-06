"use client";

import { useUserDetail } from "@/hooks/use-user-details";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
	ArrowLeft,
	Mail,
	Shield,
	User as UserIcon,
	Calendar,
	Copy,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { User } from "@/types";
import * as motion from "motion/react-client";

const roleStyles: Record<User["role"], string> = {
	ADMIN: "bg-red-500/10 text-red-600 border-red-500/20",
	USER: "bg-blue-500/10 text-blue-600 border-blue-500/20",
	SUPER_ADMIN: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

function Field({
	label,
	value,
	icon: Icon,
}: {
	label: string;
	value: React.ReactNode;
	icon?: any;
}) {
	return (
		<div className="flex items-start gap-3 rounded-lg border p-4">
			{Icon && <Icon className="h-4 w-4 text-muted-foreground mt-1" />}
			<div className="space-y-1">
				<p className="text-xs text-muted-foreground">{label}</p>
				<div className="text-sm font-medium break-all">{value}</div>
			</div>
		</div>
	);
}

export default function UserDetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user, isLoading, error } = useUserDetail(id as string);

	if (isLoading) {
		return (
			<main className="min-h-screen bg-background">
				<div className="container mx-auto py-10 space-y-6">
					<Skeleton className="h-9 w-24" />
					<Card>
						<CardHeader className="flex-row items-center gap-4">
							<Skeleton className="h-16 w-16 rounded-full" />
							<div className="space-y-2">
								<Skeleton className="h-6 w-48" />
								<Skeleton className="h-4 w-64" />
							</div>
						</CardHeader>
						<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{Array.from({ length: 6 }).map((_, i) => (
								<Skeleton key={i} className="h-20 w-full" />
							))}
						</CardContent>
					</Card>
				</div>
			</main>
		);
	}

	if (error || !user) {
		return (
			<main className="min-h-screen bg-background">
				<div className="container mx-auto py-10 text-center space-y-4">
					<Button variant="outline" onClick={() => navigate(-1)}>
						<ArrowLeft className="h-4 w-4" /> Back
					</Button>
					<p className="text-muted-foreground">User not found.</p>
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-background">
			<div className="container mx-auto py-10 space-y-6">
				<Button variant="ghost" className="gap-2" onClick={() => navigate(-1)}>
					<ArrowLeft className="h-4 w-4" /> Back to users
				</Button>

				<motion.div
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}>
					<Card className="overflow-hidden">
						<CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-muted/40">
							<div className="flex items-center gap-4">
								<Avatar className="h-16 w-16">
									<AvatarImage src={user.photo || "/placeholder.svg"} />
									<AvatarFallback>
										{user.firstName[0]}
										{user.lastName?.[0] || ""}
									</AvatarFallback>
								</Avatar>
								<div>
									<CardTitle className="text-2xl flex items-center gap-2">
										{user.firstName} {user.lastName}
									</CardTitle>
									<p className="text-sm text-muted-foreground flex items-center gap-1">
										<Mail className="h-3 w-3" /> {user.email}
									</p>
								</div>
							</div>
							<Badge variant="outline" className={roleStyles[user.role]}>
								<Shield className="h-3 w-3 mr-1" /> {user.role}
							</Badge>
						</CardHeader>

						<CardContent className="space-y-6">
							<Separator />

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Field
									label="First Name"
									value={user.firstName}
									icon={UserIcon}
								/>
								<Field
									label="Last Name"
									value={user.lastName || "-"}
									icon={UserIcon}
								/>
								<Field label="User ID" value={user.id} icon={Copy} />
								<Field
									label="Created At"
									value={new Date(user.createdAt).toLocaleString()}
									icon={Calendar}
								/>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</main>
	);
}
