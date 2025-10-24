import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is there a free plan available?",
    answer: "Yes! We offer a generous free tier that includes all essential features. You can upgrade anytime for additional storage and premium features."
  },
  {
    question: "How secure are my notes?",
    answer: "Your notes are encrypted end-to-end and stored securely in the cloud. We use industry-standard security practices to protect your data."
  },
  {
    question: "Can I access my notes offline?",
    answer: "Yes, our desktop and mobile apps support offline access. Your changes will sync automatically when you're back online."
  },
  {
    question: "Can I collaborate with others?",
    answer: "Absolutely! You can share notes and collaborate in real-time with team members. Premium plans include advanced collaboration features."
  },
  {
    question: "What happens if I exceed my storage limit?",
    answer: "You'll receive a notification when approaching your limit. You can either upgrade your plan or manage your storage by archiving or deleting unused notes."
  }
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 px-4 md:px-6">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
            Everything you need to know about the product and billing.
          </p>
        </div>
        <div className="max-w-[800px] mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
