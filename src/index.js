
async function fetchBirds() {
  const res = await fetch('https://aves.ninjas.cl/api/birds');
  return await res.json();

}



window.addEventListener('load', async e => {
  fetchBirds().then(res => {
    res.forEach(bird => {
      $('.container').append(`<p>${bird.name.spanish}</p>`)
    })
  })
  if ('serviceWorker' in navigator) {
      try {
          navigator.serviceWorker.register('serviceWorker.js');
          console.log('SW registered');

      } catch (error) {
          console.log('SW failed');

      }
  }
});