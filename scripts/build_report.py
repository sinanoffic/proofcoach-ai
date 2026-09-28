"""
ProofCoach AI — Master Report Builder
Assembles Part 1, 2, 3, 4 into:
- docs/PROOFCOACH_SYSTEM_DEEP_DIVE.md
- docs/PROOFCOACH_SYSTEM_DEEP_DIVE.html
- docs/PROOFCOACH_SYSTEM_DEEP_DIVE.pdf (via Microsoft Edge Headless)
"""

import sys
import subprocess
from pathlib import Path
import markdown

BASE_DIR = Path(__file__).resolve().parent.parent
DOCS_DIR = BASE_DIR / "docs"
DOCS_DIR.mkdir(parents=True, exist_ok=True)

# Import sections
sys.path.insert(0, str(Path(__file__).resolve().parent))
from report_sections import part1_overview, part2_features, part3_technical, part4_analysis

# Combine Markdown content
full_markdown = (
    part1_overview.CONTENT.strip() + "\n\n---\n\n" +
    part2_features.CONTENT.strip() + "\n\n---\n\n" +
    part3_technical.CONTENT.strip() + "\n\n---\n\n" +
    part4_analysis.CONTENT.strip() + "\n"
)

md_file = DOCS_DIR / "PROOFCOACH_SYSTEM_DEEP_DIVE.md"
html_file = DOCS_DIR / "PROOFCOACH_SYSTEM_DEEP_DIVE.html"
pdf_file = DOCS_DIR / "PROOFCOACH_SYSTEM_DEEP_DIVE.pdf"

print(f"Writing Markdown to: {md_file}")
md_file.write_text(full_markdown, encoding="utf-8")

# Convert Markdown to HTML
html_body = markdown.markdown(
    full_markdown,
    extensions=["tables", "fenced_code", "toc", "attr_list", "def_list"]
)

# HTML Template with editorial dark/crystal tech aesthetic
html_template = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ProofCoach AI — Complete System & Product Deep-Dive Report</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

    :root {{
      --bg: #03060D;
      --surface: #0A111D;
      --surface-subtle: #0F172A;
      --border: #1E293B;
      --border-accent: #27C4FF;
      --text: #F8FAFC;
      --text-muted: #94A3B8;
      --primary: #1877FF;
      --crystal: #27C4FF;
      --success: #22C77A;
      --warning: #F2B84B;
      --danger: #F26161;
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}

    body {{
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.68;
      font-size: 15px;
      padding: 0;
    }}

    .container {{
      max-width: 960px;
      margin: 0 auto;
      padding: 40px 48px;
    }}

    /* Cover Page */
    .cover-page {{
      min-height: 95vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid var(--border);
      border-radius: 12px;
      background: linear-gradient(180deg, rgba(10, 17, 29, 0.95) 0%, rgba(3, 6, 13, 1) 100%);
      padding: 64px 48px;
      margin-bottom: 60px;
      position: relative;
      overflow: hidden;
      page-break-after: always;
      break-after: page;
    }}

    .cover-page::before {{
      content: '';
      position: absolute;
      top: -20%;
      right: -20%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(39, 196, 255, 0.12) 0%, transparent 70%);
      pointer-events: none;
    }}

    .cover-top {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border);
      padding-bottom: 24px;
    }}

    .brand-mark {{
      font-size: 18px;
      font-weight: 800;
      letter-spacing: 2px;
      color: var(--crystal);
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 12px;
    }}

    .brand-mark span {{
      color: #FFF;
    }}

    .cover-middle {{
      margin: 40px 0;
    }}

    .doc-kicker {{
      font-size: 12px;
      font-weight: 700;
      color: var(--crystal);
      letter-spacing: 2.5px;
      text-transform: uppercase;
      margin-bottom: 16px;
      display: block;
    }}

    .doc-title {{
      font-size: 38px;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.5px;
      color: #FFFFFF;
      margin-bottom: 16px;
    }}

    .doc-tagline {{
      font-size: 20px;
      font-weight: 500;
      color: var(--crystal);
      margin-bottom: 28px;
    }}

    .doc-desc {{
      font-size: 16px;
      color: var(--text-muted);
      max-width: 680px;
      line-height: 1.6;
    }}

    .cover-bottom {{
      border-top: 1px solid var(--border);
      padding-top: 24px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      font-size: 13px;
    }}

    .cover-meta-item small {{
      display: block;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 600;
      font-size: 11px;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }}

    .cover-meta-item strong {{
      color: #FFFFFF;
      font-weight: 600;
    }}

    /* Typography */
    h1, h2, h3, h4, h5, h6 {{
      color: #FFFFFF;
      font-weight: 700;
      line-height: 1.3;
      margin-top: 36px;
      margin-bottom: 16px;
    }}

    h1 {{
      font-size: 28px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 12px;
      page-break-before: always;
      break-before: page;
    }}

    h2 {{
      font-size: 22px;
      color: var(--crystal);
      border-left: 3px solid var(--crystal);
      padding-left: 14px;
      margin-top: 48px;
      page-break-before: auto;
    }}

    h3 {{
      font-size: 18px;
      color: #F1F5F9;
    }}

    h4 {{
      font-size: 15px;
      color: var(--crystal);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }}

    p {{
      margin-bottom: 16px;
      color: #CBD5E1;
    }}

    strong {{
      color: #FFFFFF;
      font-weight: 600;
    }}

    em {{
      color: var(--crystal);
      font-style: normal;
    }}

    hr {{
      border: 0;
      border-top: 1px solid var(--border);
      margin: 40px 0;
    }}

    ul, ol {{
      margin-bottom: 20px;
      padding-left: 24px;
      color: #CBD5E1;
    }}

    li {{
      margin-bottom: 8px;
    }}

    blockquote {{
      border-left: 3px solid var(--primary);
      background: var(--surface);
      padding: 16px 20px;
      margin: 20px 0;
      border-radius: 0 8px 8px 0;
      font-style: italic;
      color: #E2E8F0;
    }}

    /* Tables */
    table {{
      width: 100%;
      border-collapse: collapse;
      margin: 24px 0;
      font-size: 13.5px;
      background: var(--surface);
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--border);
      page-break-inside: avoid;
    }}

    th, td {{
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }}

    th {{
      background: var(--surface-subtle);
      color: var(--crystal);
      font-weight: 600;
      text-transform: uppercase;
      font-size: 11.5px;
      letter-spacing: 0.8px;
    }}

    tr:last-child td {{
      border-bottom: 0;
    }}

    tr:nth-child(even) td {{
      background: rgba(15, 23, 42, 0.4);
    }}

    /* Code & Pre */
    code {{
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 12.5px;
      background: var(--surface-subtle);
      color: var(--crystal);
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }}

    pre {{
      background: #050B14;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 18px 20px;
      margin: 20px 0;
      overflow-x: auto;
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 12.5px;
      line-height: 1.5;
      color: #E2E8F0;
      page-break-inside: avoid;
    }}

    pre code {{
      background: transparent;
      border: 0;
      padding: 0;
      color: inherit;
    }}

    /* Figures and Images */
    figure {{
      margin: 32px 0;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 16px;
      text-align: center;
      page-break-inside: avoid;
    }}

    figure img {{
      max-width: 100%;
      height: auto;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    }}

    figcaption {{
      margin-top: 12px;
      font-size: 12.5px;
      color: var(--text-muted);
      font-weight: 500;
    }}

    /* Callout Card */
    .callout {{
      background: rgba(39, 196, 255, 0.06);
      border: 1px solid rgba(39, 196, 255, 0.2);
      border-radius: 8px;
      padding: 18px 20px;
      margin: 20px 0;
    }}

    .callout h4 {{
      color: var(--crystal);
      margin-top: 0;
      margin-bottom: 8px;
    }}

    /* Links */
    a {{
      color: var(--crystal);
      text-decoration: none;
    }}

    a:hover {{
      text-decoration: underline;
    }}

    /* Print Styles */
    @page {{
      size: A4;
      margin: 16mm 14mm 16mm 14mm;
    }}

    @media print {{
      body {{
        background: #03060D !important;
        color: #F8FAFC !important;
      }}
      .container {{
        max-width: 100%;
        padding: 0;
      }}
      h1 {{
        page-break-before: always;
        break-before: page;
      }}
      h2, h3, figure, table, pre {{
        page-break-inside: avoid;
        break-inside: avoid;
      }}
    }}
  </style>
</head>
<body>
  <div class="container">
    
    <!-- Cover Page -->
    <div class="cover-page">
      <div class="cover-top">
        <div class="brand-mark">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          PROOFCOACH <span>AI</span>
        </div>
        <div style="font-size: 12px; letter-spacing: 1px; color: var(--text-muted); text-transform: uppercase;">
          System & Product Manual
        </div>
      </div>

      <div class="cover-middle">
        <span class="doc-kicker">Comprehensive Technical Deep-Dive Report</span>
        <h1 class="doc-title" style="page-break-before: avoid; border: 0; padding: 0;">PROOFCOACH AI</h1>
        <div class="doc-tagline">Build it. Prove it. Defend it.</div>
        <p class="doc-desc">
          An architectural reverse-engineering, system specification, and product manual documenting 
          the local-first career preparation platform that connects resume parsing, role evidence graphs, 
          adaptive interview probing, honest feedback loops, and targeted artifact development.
        </p>
      </div>

      <div class="cover-bottom">
        <div class="cover-meta-item">
          <small>Author & Project</small>
          <strong>ProofCoach AI Engineering</strong>
        </div>
        <div class="cover-meta-item">
          <small>System Version</small>
          <strong>v0.1.0 (Deterministic Vertical Slice)</strong>
        </div>
        <div class="cover-meta-item">
          <small>Classification</small>
          <strong>Architecture & Product Deep-Dive</strong>
        </div>
      </div>
    </div>

    <!-- Main Content Body -->
    <div class="report-content">
      {html_body}
    </div>

  </div>
</body>
</html>
"""

print(f"Writing HTML to: {html_file}")
html_file.write_text(html_template, encoding="utf-8")

# Compile to PDF using Microsoft Edge Headless
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if Path(edge_path).exists():
    print(f"Compiling PDF via Microsoft Edge Headless to: {pdf_file}")
    args = [
        edge_path,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_file}",
        str(html_file)
    ]
    res = subprocess.run(args, capture_output=True, text=True)
    if pdf_file.exists():
        size_kb = round(pdf_file.stat().st_size / 1024)
        print(f"PDF Successfully Generated! Size: {size_kb} KB ({pdf_file.stat().st_size} bytes)")
    else:
        print(f"PDF generation failed: {res.stderr}")
else:
    print(f"Edge executable not found at {edge_path}")

print("Master Build Complete!")
