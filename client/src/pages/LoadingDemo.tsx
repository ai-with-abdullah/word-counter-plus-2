import { LoadingAnimationDemo } from '@/components/ui/loading-animations';
import useSEO from '@/hooks/useSEO';

export default function LoadingDemo() {
  useSEO({
    title: "Loading Animation Demo - Word Counter Plus",
    description: "Preview different loading animation options for the Word Counter Plus application.",
    canonical: "https://wordcounterplusapp.com/loading-demo"
  });

  return <LoadingAnimationDemo />;
}