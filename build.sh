#!/usr/bin/env bash
# Construiește folderul docs/ pentru GitHub Pages din app.html.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p docs
{
  cat <<'HEAD'
<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#2b4acb">
<meta name="description" content="Fotografiezi foi de hârtie și faci din ele un PDF.">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="icon-192.png">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}[hidden]{display:none!important}img{max-width:100%}</style>
HEAD
  sed 's#https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js#jspdf.umd.min.js#' app.html
  cat <<'TAIL'
<script>if("serviceWorker" in navigator)addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));</script>
</body>
</html>
TAIL
} > docs/index.html
cp sw.js manifest.webmanifest icon.svg icon-192.png icon-512.png docs/
cp tools/jspdf.umd.min.js tools/opencv.js docs/
echo "docs/ gata"
