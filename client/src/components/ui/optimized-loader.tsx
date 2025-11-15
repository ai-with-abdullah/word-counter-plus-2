import { LoadingSpinner } from "./loading-spinner";

export const OptimizedLoader = ({ message = "Loading..." }: { message?: string }) => (
  <LoadingSpinner size="md" text={message} />
);

export const TextAnalysisLoader = () => (
  <LoadingSpinner size="md" text="Analyzing..." />
);