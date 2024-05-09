import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

export class Map {
  constructor(coords) {
    this.render(coords);
  }

  render(coordinates) {
    if (!mapboxgl) {
      alert('Could not load maps library - please try again later❗');
    }

    const mapEl = document.getElementById('map');
    mapEl.innerHTML = '';

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: 'map',
      center: coordinates,
      style: 'mapbox://styles/mapbox/standard',
      zoom: 16,
    });

    const bounds = new mapboxgl.LngLatBounds();

    //- add marker
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(coordinates)
      .addTo(map);

    //- extend map bounds to include current location
    bounds.extend(coordinates);
  }
}
