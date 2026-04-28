/**
 * @swagger
 * tags:
 *   name: Terms
 *   description: Terms and Conditions download endpoint
 */

/**
 * @swagger
 * /api/terms/download:
 *   get:
 *     summary: Download Terms and Conditions
 *     tags: [Terms]
 *     parameters:
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           enum: [en, fr, de, es, it, pt]
 *           default: en
 *         required: false
 *         description: >
 *           Language code for the Terms and Conditions document.
 *           Supported: en (English), fr (French), de (German),
 *           es (Spanish), it (Italian), pt (Portuguese).
 *           Defaults to English if the requested language is unavailable.
 *     responses:
 *       200:
 *         description: Terms and Conditions document as a downloadable text file
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       403:
 *         description: Access denied – automated clients are not permitted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: FORBIDDEN
 *                     message:
 *                       type: string
 *                       example: Automated access is not permitted
 *       500:
 *         description: Internal server error
 */

import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

/** Supported language codes mapped to their document filenames. */
const SUPPORTED_LANGUAGES: Record<string, string> = {
  en: 'terms-en.txt',
  fr: 'terms-fr.txt',
  de: 'terms-de.txt',
  es: 'terms-es.txt',
  it: 'terms-it.txt',
  pt: 'terms-pt.txt',
};

const DEFAULT_LANGUAGE = 'en';

/**
 * Known bot/crawler User-Agent patterns.
 * Matches common search engine crawlers, AI scrapers, and generic bot identifiers.
 */
const BOT_PATTERNS = [
  /googlebot/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /sogou/i,
  /exabot/i,
  /facebot/i,
  /ia_archiver/i,
  /semrushbot/i,
  /ahrefsbot/i,
  /mj12bot/i,
  /dotbot/i,
  /rogerbot/i,
  /linkdexbot/i,
  /screaming\s*frog/i,
  /gptbot/i,
  /chatgpt/i,
  /claudebot/i,
  /anthropic/i,
  /cohere-ai/i,
  /perplexitybot/i,
  /amazonbot/i,
  /bytespider/i,
  /petalbot/i,
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
];

/**
 * Middleware that blocks requests from known bots and crawlers based on
 * the User-Agent header.
 */
function blockBots(req: Request, res: Response, next: NextFunction): void {
  const userAgent = req.headers['user-agent'] ?? '';

  if (!userAgent) {
    res.status(403).json({
      error: {
        code: 'FORBIDDEN',
        message: 'Automated access is not permitted',
      },
    });
    return;
  }

  const isBot = BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
  if (isBot) {
    res.status(403).json({
      error: {
        code: 'FORBIDDEN',
        message: 'Automated access is not permitted',
      },
    });
    return;
  }

  next();
}

// GET /api/terms/download?lang=en
router.get('/download', blockBots, (req: Request, res: Response, next: NextFunction): void => {
  try {
    const requestedLang = typeof req.query.lang === 'string' ? req.query.lang.toLowerCase() : DEFAULT_LANGUAGE;
    const lang = SUPPORTED_LANGUAGES[requestedLang] ? requestedLang : DEFAULT_LANGUAGE;
    const filename = SUPPORTED_LANGUAGES[lang];

    const filePath = path.join(__dirname, '..', 'legal', filename);

    if (!fs.existsSync(filePath)) {
      res.status(500).json({
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Terms document not available',
        },
      });
      return;
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="terms-and-conditions-${lang}.txt"`);
    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
});

export default router;
