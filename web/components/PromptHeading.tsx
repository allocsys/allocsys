export default function PromptHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2>
      <span className="prompt">$</span>
      {children}
    </h2>
  );
}
