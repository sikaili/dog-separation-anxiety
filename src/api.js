(() => {
  if ('geolocation' in navigator) {
    console.log('ok');
    navigator.geolocation.getCurrentPosition(async a => {
      const data = {
        lat: a.coords.latitude,
        long: a.coords.longitude
      };
      console.log(data);
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
      const response = await fetch('/api', options);
      const json = await response.json();
      console.log(json);
    })
  } else {
    console.log('Geolocation not available');
  }
})();