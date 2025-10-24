import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Real-time Sync",
    description: "Your notes sync instantly across all your devices, keeping you up to date everywhere.",
    icon: "⚡"
  },
  {
    title: "Rich Text Editor",
    description: "Format your notes with markdown, add images, and create beautiful documents.",
    icon: "✍️"
  },
  {
    title: "Smart Organization",
    description: "Organize notes with tags, folders, and our powerful search functionality.",
    icon: "🗂️"
  },
  {
    title: "Collaboration",
    description: "Share notes and collaborate with team members in real-time.",
    icon: "👥"
  },
  {
    title: "Secure Storage",
    description: "Your notes are encrypted and securely stored in the cloud.",
    icon: "🔒"
  },
  {
    title: "Cross-platform",
    description: "Access your notes from any device - desktop, mobile, or web browser.",
    icon: "🌐"
  }
]

export function Features() {
  return (
    <section id="features" className="py-24 px-4 md:px-6 bg-slate-50 dark:bg-slate-900">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            Everything you need to capture your best ideas
          </h2>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
            Powerful features that help you write, organize, and share your notes with ease.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

