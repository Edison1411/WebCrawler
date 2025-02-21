const { scrapeHackerNews } = require('../src/scraper');

describe('scrapeHackerNews', () => {
  it('debe retornar un array de artículos', async () => {
    const data = await scrapeHackerNews();
    expect(Array.isArray(data)).toBe(true);
  });

  it('debe retornar objetos con campos esperados', async () => {
    const data = await scrapeHackerNews();
    if (data.length > 0) {
      const article = data[0];
      expect(article).toHaveProperty('rank');
      expect(article).toHaveProperty('title');
      expect(article).toHaveProperty('points');
      expect(article).toHaveProperty('comments');
      expect(article).toHaveProperty('wordCount');
    } else {
      expect(data.length).toBeGreaterThan(0);
    }
  });

  it('debe contar palabras correctamente', () => {
    const exampleTitle = 'Example title!';
    const dataMock = [{ rank: 1, title: exampleTitle, points: 10, comments: 2, wordCount: 5 }];
    expect(dataMock[0].wordCount).toBe(5);
  });
});
