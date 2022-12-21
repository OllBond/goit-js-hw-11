export function createOnePictureMarkup(pictures = []) {
  return pictures
    .map(
      // picture - це об'єкт  picture.largeImageURL - ключ об'єкта
      picture => `
        <div class="photo-card">
    <a class "gallery-link" href="${picture.largeImageURL}">
    <img class "gallery-image" src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" width="370" height="240"/>
    </a>
    
    <div class="info">
      <p class="info-item">
        <b>Likes: ${picture.likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${picture.views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${picture.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${picture.downloads}</b>
      </p>
    </div>
  </div>`
    )
    .join('');
}
