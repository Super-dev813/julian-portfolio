import { DATA } from "@/data/resume";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {DATA.fullName}
        </p>
        <p>
          Built on the{" "}
          <a
            href="https://github.com/magicuidesign/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
          >
            Magic UI portfolio template
          </a>
        </p>
      </div>
    </footer>
  );
}
