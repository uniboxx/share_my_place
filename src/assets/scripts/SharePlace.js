import { Modal } from '../../UI/Modal.js';
import { Map } from '../../UI/Map.js';
import {
  getCoordsFromAddress,
  getAddressFromCoordinates,
} from '../../Utility/Location.js';

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('#place-data form');
    const locateUserBtn = document.getElementById('locate-btn');
    this.shareBtn = document.getElementById('share-btn');

    locateUserBtn?.addEventListener('click', this.locateUserHandler.bind(this));
    addressForm?.addEventListener('submit', this.findAddressHandler.bind(this));
    this.shareBtn.addEventListener('click', this.sharePlaceHandler);
  }

  sharePlaceHandler() {
    const shareLinkInputEl = document.getElementById('share-link');
    if (!navigator.clipboard) {
      shareLinkInputEl.select();
      return;
    }

    navigator.clipboard
      .writeText(shareLinkInputEl.value)
      .then(() => {
        alert(`Copied into clipboard!`);
      })
      .catch(err => {
        console.error(err);
        shareLinkInputEl.select();
      });
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    const [lng, lat] = coordinates;
    this.shareBtn.disabled = false;
    const shareLinkInputEl = document.getElementById('share-link');
    shareLinkInputEl.value = `${
      location.origin
    }/src/my-place/?address=${encodeURI(address)}&lat=${lat}&lng=${lng}`;
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      return alert(
        'Location feature is not available in your browser - please use a more modern browser or manually enter an address'
      );
    }
    const modal = new Modal(
      'loading-modal-content',
      'Loading location - please wait'
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      async successResult => {
        const coordinates = [
          successResult.coords.longitude,
          successResult.coords.latitude,
        ];
        console.log(coordinates);
        const address = await getAddressFromCoordinates(coordinates);
        modal.hide();
        console.log(address);
        this.selectPlace(coordinates, address);
      },
      error => {
        modal.hide();
        alert(
          'Could not locate you unfortunately. Please enter an address manually❗'
        );
      }
    );
  }

  async findAddressHandler(e) {
    e.preventDefault();
    const address = e.target.querySelector('input').value;
    if (!address || address.trim().length === 0) {
      return alert('Invalid address entered - please try again❗');
    }
    const modal = new Modal(
      'loading-modal-content',
      'Loading location - please wait'
    );
    modal.show();
    try {
      const coordinates = await getCoordsFromAddress(address);
      console.log(coordinates);
      this.selectPlace(coordinates, address);
    } catch (err) {
      alert(err.message);
    }
    modal.hide();
  }
}

const placeFinder = new PlaceFinder();
