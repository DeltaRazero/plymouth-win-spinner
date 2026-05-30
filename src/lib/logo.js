import { new_empty_image, WINDOW } from 'lib/global.js';
import { image_relscale_xy, sprite_pos_x, sprite_pos_y } from 'lib/positioning.js';

// *****************************************************************************
//   LOGOS
// *****************************************************************************

function _load_logo() {
  let is_bgrt = false;

  // Attempt to load custom logo first.
  let image = Image("custom/logo.png");
  // Otherwise try BGRT logo.
  if (!image) {
    image = Image("res/gfx/bgrt.png");
    if (image) {
      is_bgrt = true;
    }
  }
  // Otherwise use fallbacks.
  if (!image) {
    image = Image("res/gfx/logo.png") || new_empty_image();
  }

  let sprite = Sprite();
  sprite.SetOpacity(0.0);

  if (is_bgrt) {
    sprite.SetImage(image);
    let BGRT_X_OFFSET=0;
    let BGRT_Y_OFFSET=0;
    // Use same size and position as displayed by the UEFI.
    sprite_pos_x(WINDOW, sprite, 0.50);
    sprite.SetY(BGRT_Y_OFFSET);
  }
  else {
    image = image_relscale_xy(WINDOW, image, 0.1575);
    sprite.SetImage(image);
    sprite_pos_x(WINDOW, sprite, 0.50);
    sprite_pos_y(WINDOW, sprite, 0.365);
  }

  if (Plymouth.GetMode() == "boot") {
    sprite.SetOpacity(1.0);
  }

  return sprite;
}

function _load_watermark() {
  let sprite = Sprite();
  sprite.SetOpacity(0.0);

  // Only show custom watermark if found.
  let image = Image("res/gfx/watermark.png") || Image("custom/watermark.png") || new_empty_image();
  image = image_relscale_xy(WINDOW, image, 0.1575);
  sprite.SetImage(image);

  sprite_pos_x(WINDOW, sprite, 0.50);
  sprite_pos_y(WINDOW, sprite, 0.975);

  return sprite;
}

/**
 * @callback fn_Logos_set_opacity
 * @argument {float} opacity
 * @returns {void}
 */
/**
 * @typedef {Object} Logos
 *
 * @property {Sprite} logo
 * @property {Sprite} watermark
 * @property {fn_Logos_set_opacity} set_opacity
 */
/** @type {Logos} */
export let logos = {};
logos.logo = _load_logo();
logos.watermark = _load_watermark();
logos.set_opacity = function (opacity) {
  this.logo.SetOpacity(opacity);
  this.watermark.SetOpacity(opacity);
};
