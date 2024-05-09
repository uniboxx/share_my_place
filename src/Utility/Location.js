export async function getCoordsFromAddress(address) {
  try {
    const urlAddress = encodeURI(address);
    console.log(urlAddress);
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${urlAddress}&access_token=${
      import.meta.env.VITE_MAPBOX_TOKEN
    }&proximity=11.328,44.4847`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Something went wrong with request❗`);
    }
    const data = await res.json();
    // console.log(data.features[0].geometry.coordinates);
    return data.features[0].geometry.coordinates;
  } catch (err) {
    alert(err.message);
  }
}

export async function getAddressFromCoordinates(coordinates) {
  try {
    const [lng, lat] = coordinates;
    const url = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lng}&latitude=${lat}&access_token=${
      import.meta.env.VITE_MAPBOX_TOKEN
    }`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Something went wrong with request❗`);
    }
    const data = await res.json();
    const address = data.features[0].properties.full_address;
    return address;
  } catch (err) {
    alert(err.message);
  }
}
