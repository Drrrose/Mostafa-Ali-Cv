import { access, copyFile, mkdir } from 'node:fs/promises'
import { extname, join, normalize, resolve, sep } from 'node:path'
import { chromium } from 'playwright'

const outputDir = resolve('.output/public')
const publicDir = resolve('public')
const basePath = '/Mostafa-Ali-Cv'
const pdfFileName = 'Mostafa-Ali-Cv.pdf'
const outputPdfPath = join(outputDir, pdfFileName)
const publicPdfPath = join(publicDir, pdfFileName)

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
}

function resolveRequestPath(url = 'http://local.test/') {
  const requestUrl = new URL(url, 'http://127.0.0.1')
  let pathname = decodeURIComponent(requestUrl.pathname)

  if (pathname === basePath || pathname === `${basePath}/`) {
    pathname = '/'
  } else if (pathname.startsWith(`${basePath}/`)) {
    pathname = pathname.slice(basePath.length)
  }

  if (pathname === '/') {
    pathname = '/index.html'
  }

  const filePath = normalize(join(outputDir, pathname))
  const safeRoot = `${outputDir}${sep}`

  if (filePath !== outputDir && !filePath.startsWith(safeRoot)) {
    throw new Error(`Refusing to serve path outside output directory: ${pathname}`)
  }

  return filePath
}

const browser = await chromium.launch()

try {
  const page = await browser.newPage({
    viewport: {
      width: 1240,
      height: 1754,
    },
  })

  await page.route('**/*', async (route) => {
    try {
      const filePath = resolveRequestPath(route.request().url())
      await access(filePath)

      await route.fulfill({
        path: filePath,
        contentType: mimeTypes[extname(filePath)] ?? 'application/octet-stream',
      })
    } catch {
      await route.fulfill({
        status: 404,
        contentType: 'text/plain; charset=utf-8',
        body: 'Not found',
      })
    }
  })

  await page.emulateMedia({ media: 'print' })
  await page.goto(`http://local.test${basePath}/`, {
    waitUntil: 'networkidle',
  })

  await page.evaluate(async () => {
    if ('fonts' in document) {
      await document.fonts.ready
    }
  })

  await page.pdf({
    path: outputPdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
  })

  await mkdir(publicDir, { recursive: true })
  await copyFile(outputPdfPath, publicPdfPath)

  console.log(`Generated ${outputPdfPath}`)
  console.log(`Updated ${publicPdfPath}`)
} finally {
  await browser.close()
}
