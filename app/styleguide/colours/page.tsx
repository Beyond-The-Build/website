export default function ColorsPage() {
  const palettes: { label: string; key: string; note?: string }[] = [
    { label: "Electric Violet", key: "electric-violet" },
    { label: "Ash Gray", key: "ash-gray" },
    { label: "Matrix Green", key: "matrix-green" },
    { label: "Warm White", key: "warm-white" },
    { label: "Off Black", key: "off-black" },
  ];

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

  function textColorFor(prefix: string, shade: number) {
    // Basic heuristic for legibility
    if (prefix === "warm-white") return "#0b1614"; // dark text on light
    if (prefix === "matrix-green" && shade <= 400) return "#0b1614";
    if (shade >= 600) return "#ffffff";
    if (prefix === "off-black") return "#ffffff";
    return "#0b1614";
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Styleguide: Colors</h1>
        <p className="text-gray-600">
          Project theme colors sourced from <code>@theme</code> custom properties in
          <code> app/globals.css</code>. Each swatch uses the corresponding CSS variable
          (e.g. <code>--color-electric-violet-500</code>), ensuring accurate display even when
          utility class generation would otherwise purge dynamic class names.
        </p>
      </header>

      <div className="space-y-12">
        {palettes.map((p) => (
          <section key={p.key} className="space-y-4">
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-medium">{p.label}</h2>
              <code className="text-sm text-gray-500">{p.key}</code>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-max grid grid-cols-11 gap-2">
                {shades.map((s) => {
                  const varName = `--color-${p.key}-${s}`;
                  const color = `var(${varName})`;
                  const text = textColorFor(p.key, s);
                  return (
                    <div
                      key={`${p.key}-${s}`}
                      className="flex aspect-square w-28 flex-col items-center justify-center rounded-md border border-gray-200 shadow-sm"
                      style={{ backgroundColor: color, color: text }}
                      title={`${p.label} ${s}`}
                    >
                      <div className="text-sm font-medium">{s}</div>
                      <div className="mt-1 text-[11px] opacity-80">{p.key}</div>
                      <div className="mt-1 text-[10px] opacity-60">{`var(${varName})`}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>

      <footer className="pt-6 text-sm text-gray-500">
        Tip: If any color doesn’t look right, check <code>app/globals.css</code> to ensure the
        corresponding <code>@theme</code> variable (e.g. <code>--color-name-500</code>) exists.
      </footer>
    </div>
  );
}
