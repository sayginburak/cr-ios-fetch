var url = 'https://rss.itunes.apple.com/api/v1/us/ios-apps/new-apps-we-love/all/100/explicit.json?at=1010lML6'

$(document).ready(function() {
  fetchAndRender();
  $('#countrySelect').change(function(e) {
    window.currentCountry = e.currentTarget.value;
    fetchAndRender();
  });

  $('#catSelect').change(function(e) {
    window.currentCat = e.currentTarget.value;
    fetchAndRender();
  });
})

var fetchAndRender = function() {
  $('.container').addClass('d-none');
  $('.container').removeClass('d-block');
  $('.loading').addClass('d-block');
  $('.loading').removeClass('d-none');
  var defaultCountry = 'us';
  var defaultCat = 'apps';
  var country = window.currentCountry || defaultCountry;
  var cat = window.currentCat || defaultCat;
  axios.get(`https://cors-anywhere.herokuapp.com/https://rss.itunes.apple.com/api/v1/${country}/ios-apps/new-${cat}-we-love/all/100/explicit.json?at=1010lML6`).then(function(res) {
    console.log(res.data.feed.results);
    $('.col-md-3').remove();
    res.data.feed.results.forEach(function(result) {
      createCard(result);
    })
  }).finally(function() {
    $('.container').addClass('d-block');
    $('.container').removeClass('d-none');
    $('.loading').addClass('d-none');
    $('.loading').removeClass('d-block');
  })
}

var createCard = function(result) {
  var column = document.createElement('div');
  column.classList.add('col-md-3');
  var card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('text-center')
  var body = document.createElement('div');
  body.classList.add('card-body');
  var image = document.createElement('img');
  image.style.width = '100px';
  image.style.height = '100px';
  image.style.margin = 'auto';
  image.classList.add('card-img-top');
  image.src = result.artworkUrl100;
  var title = document.createElement('a');
  title.innerHTML = result.name;
  title.classList.add('card-title');
  title.href = result.url;
  var text = document.createElement('p');
  var categories = result.genres.map(function(a) { return a.name}).join(', ')
  text.innerHTML = `Categories: ${categories}`;
  text.classList.add('card-text');
  var creator = document.createElement('p');
  creator.classList.add('card-text');
  creator.innerHTML = `Company:<a href='${result.artistUrl}'>${result.artistName}</a>`
  card.appendChild(image);
  card.appendChild(body);
  body.appendChild(title);
  body.appendChild(creator);
  body.appendChild(text);
  column.appendChild(card);
  $('.row').append(column);
}
