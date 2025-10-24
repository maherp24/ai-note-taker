import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="py-24 px-4 md:px-6">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Your thoughts, organized{" "}
            <span className="text-primary">beautifully</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            Capture ideas, organize thoughts, and boost your productivity with our intuitive note-taking app. Start writing smarter today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started for Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/ai-demo">Watch Demo</Link>
            </Button>
          </div>
          <div className="pt-8">
            <p className="text-sm text-muted-foreground">
              🔒 Free forever tier • No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

