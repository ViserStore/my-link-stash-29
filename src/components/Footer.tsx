export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 mt-20">
      <div className="container max-w-6xl mx-auto px-5 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-lg">🌐</span>
            <span>My Link Collection - Organize your favorite links</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="text-accent">✨</span>
              Built with React & Tailwind
            </span>
            <span className="flex items-center gap-2">
              <span className="text-accent">💖</span>
              Made with Lovable
            </span>
          </div>
        </div>
        
        <div className="text-center mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
          © 2024 Link Collection. Keep your links organized and beautiful.
        </div>
      </div>
    </footer>
  );
}