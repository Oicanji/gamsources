import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function ScriptFile({ data }) {
  // extract the code from the file with base64
  const code = atob(data.split(",")[1]);
  const extension = data.split(";")[0].split("/")[1];

  if (!SyntaxHighlighter.supportedLanguages.includes(extension)) {
    return <div>{code}</div>;
  }
  return (
    <SyntaxHighlighter
      language={extension}
      style={atomDark}
      showLineNumbers
      className="script-file"
    >
      {code}
    </SyntaxHighlighter>
  );
}
