const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeHackerNews() {
  try {
    const url = 'https://news.ycombinator.com/';
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const articles = [];
    $('.athing').each((index, element) => {
      if (articles.length >= 30) return false; // Solo tomar los primeros 30

      const rank = $(element).find('.rank').text().replace('.', '').trim();
      const title = $(element).find('.titleline > a').text().trim();
      const subtextEl = $(element).next().find('.subtext');
      const pointsText = subtextEl.find('.score').text().trim();
      const commentsText = subtextEl.find('a').last().text().trim();
      let points = 0;
      if (pointsText) {
        points = parseInt(pointsText.replace(/\D/g, ''), 10) || 0;
      }
      // Obtener número de comentarios
      let comments = 0;
      if (commentsText.includes('comment')) {
        comments = parseInt(commentsText.replace(/\D/g, ''), 10) || 0;
      }

      // Contar palabras en el título
      const wordCount = countWords(title);

      // Agregar al array
      articles.push({
        rank: Number(rank),
        title,
        points,
        comments,
        wordCount,
      });
    });

    return articles;
  } catch (error) {
    console.error('Error en scraper:', error);
    throw error;
  }
}

function countWords(text) {
  const cleaned = text.replace(/[^\w\sáéíóúÁÉÍÓÚñÑ]/g, '');
  const words = cleaned.split(/\s+/).filter(Boolean);
  return words.length;
}

module.exports = {
  scrapeHackerNews,
};
