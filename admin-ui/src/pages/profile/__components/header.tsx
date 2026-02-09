"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Dispatch, SetStateAction } from "react";

export default function ProfileHeader({
	isEditing,
	setIsEditing,
}: {
	isEditing: boolean;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
}) {
	return (
		<div className="mb-8">
			<Link to={"/admin"}>
				<Button
					variant="ghost"
					size="sm"
					className="mb-6 gap-2 text-slate-600 hover:text-slate-900">
					<ArrowLeft className="h-4 w-4" />
					Back
				</Button>
			</Link>
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-slate-900 mb-2">Profile</h1>
					<p className="text-slate-600">
						Manage your personal information and account settings
					</p>
				</div>

				<Button
					type="button"
					variant={isEditing ? "destructive" : "default"}
					onClick={() => setIsEditing(!isEditing)}
					className="flex-1   max-w-[150px]">
					{isEditing ? "Cancel" : "Edit Profile"}
				</Button>
			</div>
		</div>
	);
}
