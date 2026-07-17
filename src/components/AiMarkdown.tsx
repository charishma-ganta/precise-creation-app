// Tiny markdown renderer for AI output (headings, lists, bold, tables not required)
export function AiMarkdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const out: React.ReactNode[] = [];
  let listBuf: string[] = [];
  const flushList = () => {
    if (listBuf.length) {
      out.push(
        <ul key={out.length} className="my-3 ml-5 list-disc space-y-1 text-foreground/90">
          {listBuf.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: inline(item) }} />
          ))}
        </ul>,
      );
      listBuf = [];
    }
  };
  const inline = (s: string) =>
    s
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, '<code class="rounded bg-secondary px-1.5 py-0.5 text-sm">$1</code>');

  lines.forEach((raw, i) => {
    const line = raw.trimEnd();
    if (/^###\s+/.test(line)) {
      flushList();
      out.push(
        <h4 key={i} className="mt-5 mb-2 text-base font-semibold text-foreground">
          {line.replace(/^###\s+/, "")}
        </h4>,
      );
    } else if (/^##\s+/.test(line)) {
      flushList();
      out.push(
        <h3 key={i} className="mt-6 mb-2 text-lg font-bold gradient-text">
          {line.replace(/^##\s+/, "")}
        </h3>,
      );
    } else if (/^#\s+/.test(line)) {
      flushList();
      out.push(
        <h2 key={i} className="mt-6 mb-2 font-display text-2xl font-bold">
          {line.replace(/^#\s+/, "")}
        </h2>,
      );
    } else if (/^\s*[-*]\s+/.test(line)) {
      listBuf.push(line.replace(/^\s*[-*]\s+/, ""));
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      out.push(
        <p
          key={i}
          className="my-2 leading-relaxed text-foreground/90"
          dangerouslySetInnerHTML={{ __html: inline(line) }}
        />,
      );
    }
  });
  flushList();
  return <div>{out}</div>;
}
