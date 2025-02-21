

const express = require('express');
const path = require('path');
const { scrapeHackerNews } = require('./src/scraper');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  try {
    const articles = await scrapeHackerNews();
    const longTitles = articles
      .filter((item) => item.wordCount > 5)
      .sort((a, b) => b.comments - a.comments);
    const shortTitles = articles
      .filter((item) => item.wordCount <= 5)
      .sort((a, b) => b.points - a.points);
    res.render('index', {
      longTitles,
      shortTitles,
    });
  } catch (error) {
    console.error('Error en /:', error);
    res.status(500).send('Ocurrió un error en la solicitud.');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
