"""
ProofCoach AI — Master Report Builder (Pure Black/Dark Navy Edition)
Assembles Part 1, 2, 3, 4 into:
- docs/PROOFCOACH_SYSTEM_DEEP_DIVE.md
- docs/PROOFCOACH_SYSTEM_DEEP_DIVE.html
- docs/PROOFCOACH_SYSTEM_DEEP_DIVE.pdf (via Microsoft Edge Headless with --enable-background-graphics)
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

# HTML Template with edge-to-edge pitch-black / crystal navy styling
html_template = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ProofCoach AI — System & Product Deep-Dive Report</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');

    :root {{
      --bg: #03060D;
      --surface: #0A111D;
      --surface-subtle: #0F172A;
      --border: #1E293B;
      --border-accent: #27C4FF;
      --text: #F1F5F9;
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
      color-adjust: exact !important;
    }}

    html {{
      background-color: #03060D !important;
      color: #F8FAFC !important;
    }}

    body {{
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #03060D !important;
      color: #F8FAFC !important;
      line-height: 1.68;
      font-size: 14.5px;
      margin: 0 !important;
      padding: 0 !important;
      width: 100%;
    }}

    .page-wrapper {{
      background-color: #03060D;
      min-height: 100vh;
      padding: 24px 36px;
      max-width: 980px;
      margin: 0 auto;
    }}

    /* Cover Page (Faithful to ProofCoach Phoenix Brand) */
    .cover-page {{
      height: 96vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #03060D;
      padding: 40px 20px;
      position: relative;
      page-break-after: always;
      break-after: page;
      border-bottom: 1px solid var(--border);
      margin-bottom: 40px;
    }}

    .cover-header {{
      display: flex;
      flex-direction: column;
      gap: 12px;
    }}

    .cover-brand {{
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 2px;
      color: var(--crystal);
      text-transform: uppercase;
    }}

    .cover-header-line {{
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, var(--border) 0%, rgba(30, 41, 59, 0.2) 100%);
    }}

    .cover-center {{
      text-align: left;
      margin-top: 10px;
    }}

    .cover-phoenix {{
      display: block;
      width: 250px;
      height: auto;
      margin: 0 0 40px 0;
      filter: drop-shadow(0 0 35px rgba(39, 196, 255, 0.35));
    }}

    .cover-title {{
      font-size: 42px;
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.5px;
      color: #FFFFFF;
      text-transform: uppercase;
      margin-bottom: 14px;
    }}

    .cover-tagline {{
      font-size: 22px;
      font-weight: 600;
      color: var(--crystal);
      margin-bottom: 24px;
      letter-spacing: -0.2px;
    }}

    .cover-description {{
      font-size: 15.5px;
      color: #94A3B8;
      max-width: 680px;
      line-height: 1.6;
      margin-bottom: 30px;
    }}

    .cover-date {{
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1.5px;
      color: var(--primary);
      text-transform: uppercase;
    }}

    .cover-footer {{
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-top: 1px solid var(--border);
      padding-top: 20px;
    }}

    .cover-footer-text {{
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #CBD5E1;
      text-transform: uppercase;
    }}

    .cover-accent-bar {{
      width: 80px;
      height: 4px;
      background: var(--crystal);
      border-radius: 2px;
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
      font-size: 26px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 10px;
      page-break-before: always;
      break-before: page;
      color: #FFFFFF;
    }}

    h2 {{
      font-size: 20px;
      color: var(--crystal);
      border-left: 3px solid var(--crystal);
      padding-left: 14px;
      margin-top: 42px;
      margin-bottom: 16px;
    }}

    h3 {{
      font-size: 17px;
      color: #F8FAFC;
      margin-top: 24px;
    }}

    h4 {{
      font-size: 14px;
      color: var(--crystal);
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-top: 20px;
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
      margin: 36px 0;
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
      margin: 22px 0;
      border-radius: 0 8px 8px 0;
      font-style: italic;
      color: #E2E8F0;
    }}

    /* Tables */
    table {{
      width: 100%;
      border-collapse: collapse;
      margin: 24px 0;
      font-size: 13px;
      background: var(--surface);
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--border);
      page-break-inside: avoid;
    }}

    th, td {{
      padding: 12px 14px;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }}

    th {{
      background: var(--surface-subtle);
      color: var(--crystal);
      font-weight: 600;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.8px;
    }}

    tr:last-child td {{
      border-bottom: 0;
    }}

    tr:nth-child(even) td {{
      background: rgba(15, 23, 42, 0.45);
    }}

    /* Code & Pre */
    code {{
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 12px;
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
      padding: 16px 18px;
      margin: 20px 0;
      overflow-x: auto;
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 12px;
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
      margin: 28px 0;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 14px;
      text-align: center;
      page-break-inside: avoid;
    }}

    figure img {{
      max-width: 100%;
      height: auto;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
    }}

    figcaption {{
      margin-top: 10px;
      font-size: 12px;
      color: var(--text-muted);
      font-weight: 500;
    }}

    /* Links */
    a {{
      color: var(--crystal);
      text-decoration: none;
    }}

    a:hover {{
      text-decoration: underline;
    }}

    /* Print Setup for Microsoft Edge */
    @page {{
      size: A4;
      margin: 12mm 14mm 12mm 14mm;
      background-color: #03060D !important;
    }}

    @media print {{
      html, body {{
        background-color: #03060D !important;
        color: #F8FAFC !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }}
      .page-wrapper {{
        background-color: #03060D !important;
        padding: 0;
        max-width: 100%;
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
  <div class="page-wrapper">
    
    <!-- Cover Page -->
    <div class="cover-page">
      <div class="cover-header">
        <div class="cover-brand">PROOFCOACH AI</div>
        <div class="cover-header-line"></div>
      </div>

      <div class="cover-center">
        <img class="cover-phoenix" src="phoenix-watermark.jpg" alt="ProofCoach Phoenix" />
        <h1 class="cover-title" style="page-break-before: avoid; border: 0; padding: 0;">COMPLETE PROJECT REPORT</h1>
        <div class="cover-tagline">Build it. Prove it. Defend it.</div>
        <p class="cover-description">
          A privacy-first career preparation system that connects resume parsing, role evidence, 
          interviews, honest feedback and targeted growth.
        </p>
        <div class="cover-date">27 SEPTEMBER 2026 · PROOFCOACH AI</div>
      </div>

      <div class="cover-footer">
        <div class="cover-footer-text">PRODUCT / ARCHITECTURE / DEMONSTRATION</div>
        <div class="cover-accent-bar"></div>
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

# Compile to PDF using Microsoft Edge Headless with full background graphics
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if Path(edge_path).exists():
    print(f"Compiling PDF via Microsoft Edge Headless to: {pdf_file}")
    args = [
        edge_path,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--enable-background-graphics",
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
