import { SignIn } from "@clerk/nextjs";
import { GridBackground } from "@/components/layout/grid-background";

export default function SignInPage() {
  return (
    <GridBackground className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "glass-card border border-white/10 shadow-2xl",
              headerTitle: "text-2xl font-bold gradient-text",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton:
                "border-white/10 hover:bg-white/5 transition-colors",
              formFieldInput:
                "bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus:border-neon-blue focus:ring-neon-blue/20",
              formFieldLabel: "text-foreground",
              formButtonPrimary:
                "bg-gradient-to-r from-neon-blue to-neon-teal hover:opacity-90 transition-opacity",
              footerActionLink: "text-neon-blue hover:text-neon-blue/80",
              identityPreviewEditButton: "text-neon-blue",
            },
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
        />
      </div>
    </GridBackground>
  );
}
