import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import termsRouter from './terms';
import { errorHandler } from '../utils/errors';

let app: express.Express;

app = express();
app.use(express.json());
app.use('/terms', termsRouter);
app.use(errorHandler);

describe('Terms API', () => {
  it('should download terms in English by default', async () => {
    const response = await request(app)
      .get('/terms/download')
      .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/text\/plain/);
    expect(response.headers['content-disposition']).toContain('terms-and-conditions-en.txt');
    expect(response.text).toContain('TERMS AND CONDITIONS');
  });

  it('should download terms in French when lang=fr', async () => {
    const response = await request(app)
      .get('/terms/download?lang=fr')
      .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    expect(response.status).toBe(200);
    expect(response.headers['content-disposition']).toContain('terms-and-conditions-fr.txt');
    expect(response.text).toContain('CONDITIONS');
  });

  it('should download terms in German when lang=de', async () => {
    const response = await request(app)
      .get('/terms/download?lang=de')
      .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    expect(response.status).toBe(200);
    expect(response.headers['content-disposition']).toContain('terms-and-conditions-de.txt');
  });

  it('should download terms in Spanish when lang=es', async () => {
    const response = await request(app)
      .get('/terms/download?lang=es')
      .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    expect(response.status).toBe(200);
    expect(response.headers['content-disposition']).toContain('terms-and-conditions-es.txt');
  });

  it('should download terms in Italian when lang=it', async () => {
    const response = await request(app)
      .get('/terms/download?lang=it')
      .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    expect(response.status).toBe(200);
    expect(response.headers['content-disposition']).toContain('terms-and-conditions-it.txt');
  });

  it('should download terms in Portuguese when lang=pt', async () => {
    const response = await request(app)
      .get('/terms/download?lang=pt')
      .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    expect(response.status).toBe(200);
    expect(response.headers['content-disposition']).toContain('terms-and-conditions-pt.txt');
  });

  it('should fall back to English for unsupported language codes', async () => {
    const response = await request(app)
      .get('/terms/download?lang=xx')
      .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    expect(response.status).toBe(200);
    expect(response.headers['content-disposition']).toContain('terms-and-conditions-en.txt');
  });

  it('should block requests with no User-Agent header', async () => {
    const response = await request(app)
      .get('/terms/download')
      .unset('User-Agent');
    expect(response.status).toBe(403);
    expect(response.body.error.code).toBe('FORBIDDEN');
  });

  it('should block Googlebot', async () => {
    const response = await request(app)
      .get('/terms/download')
      .set('User-Agent', 'Googlebot/2.1 (+http://www.google.com/bot.html)');
    expect(response.status).toBe(403);
    expect(response.body.error.code).toBe('FORBIDDEN');
  });

  it('should block GPTBot (AI crawler)', async () => {
    const response = await request(app)
      .get('/terms/download')
      .set('User-Agent', 'GPTBot/1.0 (+https://openai.com/gptbot)');
    expect(response.status).toBe(403);
    expect(response.body.error.code).toBe('FORBIDDEN');
  });

  it('should block generic bot User-Agents', async () => {
    const response = await request(app)
      .get('/terms/download')
      .set('User-Agent', 'MyCustomBot/1.0');
    expect(response.status).toBe(403);
    expect(response.body.error.code).toBe('FORBIDDEN');
  });

  it('should block generic crawler User-Agents', async () => {
    const response = await request(app)
      .get('/terms/download')
      .set('User-Agent', 'DataCrawler/2.0');
    expect(response.status).toBe(403);
    expect(response.body.error.code).toBe('FORBIDDEN');
  });

  it('should block ClaudeBot (AI crawler)', async () => {
    const response = await request(app)
      .get('/terms/download')
      .set('User-Agent', 'ClaudeBot/1.0 (+https://www.anthropic.com/claude-web)');
    expect(response.status).toBe(403);
    expect(response.body.error.code).toBe('FORBIDDEN');
  });
});
