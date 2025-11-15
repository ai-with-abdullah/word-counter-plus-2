import { Card } from "@/components/ui/card";
import { LoadingSpinner, LoadingDots, LoadingBar, LoadingPulse } from "@/components/ui/loading-spinner";

export default function LoadingDemo() {
  return (
    <div className="min-h-screen bg-background py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Loading Animations Preview
            </h1>
            <p className="text-lg text-muted-foreground">
              Professional loading animations used across the site
            </p>
          </div>

          {/* Main Spinner Variations */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Main Spinner (Different Sizes)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-8 flex flex-col items-center justify-center min-h-[200px]">
                <LoadingSpinner size="sm" />
                <p className="mt-4 text-sm text-muted-foreground">Small</p>
              </Card>
              <Card className="p-8 flex flex-col items-center justify-center min-h-[200px]">
                <LoadingSpinner size="md" />
                <p className="mt-4 text-sm text-muted-foreground">Medium</p>
              </Card>
              <Card className="p-8 flex flex-col items-center justify-center min-h-[200px]">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-sm text-muted-foreground">Large</p>
              </Card>
              <Card className="p-8 flex flex-col items-center justify-center min-h-[200px]">
                <LoadingSpinner size="xl" />
                <p className="mt-4 text-sm text-muted-foreground">Extra Large</p>
              </Card>
            </div>
          </div>

          {/* Spinner with Text */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Spinner with Text</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-8 flex flex-col items-center justify-center min-h-[200px]">
                <LoadingSpinner size="md" text="Loading..." />
              </Card>
              <Card className="p-8 flex flex-col items-center justify-center min-h-[200px]">
                <LoadingSpinner size="md" text="Analyzing text..." />
              </Card>
              <Card className="p-8 flex flex-col items-center justify-center min-h-[200px]">
                <LoadingSpinner size="md" text="Processing..." />
              </Card>
            </div>
          </div>

          {/* Alternative Loading Styles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Alternative Styles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="p-8 flex flex-col items-center justify-center min-h-[150px]">
                <LoadingDots />
                <p className="mt-4 text-sm text-muted-foreground">Bouncing Dots</p>
              </Card>
              <Card className="p-8 flex flex-col items-center justify-center min-h-[150px]">
                <LoadingPulse />
                <p className="mt-4 text-sm text-muted-foreground">Pulsing Dots</p>
              </Card>
              <Card className="p-8 flex flex-col items-center justify-center min-h-[150px]">
                <div className="w-full max-w-[200px]">
                  <LoadingBar />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Loading Bar</p>
              </Card>
            </div>
          </div>

          {/* Use Cases */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Usage Examples</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Page Loading */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Full Page Loading</h3>
                <div className="bg-muted/30 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
                  <LoadingSpinner size="xl" text="Loading page..." />
                </div>
              </Card>

              {/* Button Loading */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Button Loading</h3>
                <div className="bg-muted/30 rounded-lg p-8 flex flex-col gap-4">
                  <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                    <LoadingDots className="scale-75" />
                    <span>Processing...</span>
                  </button>
                  <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                    <div className="w-5 h-5">
                      <div className="w-full h-full border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    </div>
                    <span>Loading...</span>
                  </button>
                </div>
              </Card>

              {/* Inline Loading */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Inline Text Loading</h3>
                <div className="bg-muted/30 rounded-lg p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <LoadingDots />
                    <span className="text-muted-foreground">Fetching data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LoadingPulse />
                    <span className="text-muted-foreground">Analyzing content</span>
                  </div>
                </div>
              </Card>

              {/* Content Loading */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Content Area Loading</h3>
                <div className="bg-muted/30 rounded-lg p-8">
                  <LoadingBar className="mb-4" />
                  <div className="flex items-center justify-center py-8">
                    <LoadingSpinner size="md" text="Loading results..." />
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Dark Mode Preview */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-foreground">Dark Mode Compatible</h2>
            <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="text-white">
                    <LoadingSpinner size="lg" />
                  </div>
                  <p className="text-sm text-gray-400">Main Spinner</p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="text-white">
                    <LoadingDots />
                  </div>
                  <p className="text-sm text-gray-400">Dots</p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="text-white w-full max-w-[200px]">
                    <LoadingBar />
                  </div>
                  <p className="text-sm text-gray-400">Bar</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
