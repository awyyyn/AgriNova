import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/constants";
import { HelpCircle } from "lucide-react";

export default function FAQsPage() {
	return (
		<div className="min-h-screen bg-background px-[5vw] py-10">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-2xl font-semibold text-foreground mb-2">
					Frequently Asked Questions
				</h1>
				<p className="text-sm text-muted-foreground">
					Common questions about using AgriNova
				</p>
			</div>
			{/* FAQ List */}
			<Accordion type="single" collapsible className="space-y-3  py-5">
				{FAQS.map((item, index) => (
					<AccordionItem
						key={index}
						value={`item-${index}`}
						className="border rounded-xl px-4">
						<AccordionTrigger className="flex items-center gap-3 py-4 text-left">
							<HelpCircle className="h-5 w-5 text-green-700 shrink-0" />
							<span className="flex-1 text-sm font-medium text-foreground">
								{item.question}
							</span>
						</AccordionTrigger>

						<AccordionContent className="pb-4 text-sm text-muted-foreground leading-6">
							{item.answer}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			{/* Footer */}
			<p className="mt-12 text-center text-xs text-muted-foreground">
				Still have questions? AgriNova is here to help 🌱
			</p>
		</div>
	);
}
