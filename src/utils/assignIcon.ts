export function assignIcon(item: any): { icon: any; key: string } {
  const place = item.properties.place;
  let icon;
  let key;

  if (place.name.includes('Old Navy')) {
    icon = require('../../icons/oldnavyPin.png');
    key = `oldnavy-${item.properties.id}`;
  } else if (place.name.includes('Gap')) {
    icon = require('../../icons/gapPin.png');
    key = `gap-${item.properties.id}`;
  } else if (place.name.includes('Athleta')) {
    icon = require('../../icons/athletaPin.png');
    key = `athleta-${item.properties.id}`;
  } else if (place.name.includes('Banana Republic')) {
    icon = require('../../icons/brPin.png');
    key = `br-${item.properties.id}`;
  } else {
    icon = require('../../icons/defaultMarker.png');
    key = `other-${item.properties.id}`;
  }

  return {
    icon,
    key,
  };
}
