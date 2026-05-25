import { new_empty_image } from './global.js';
import { image_scale_to_xy, sprite_set_position_x, sprite_set_position_y } from './positioning.js';

// *****************************************************************************
//   LOGOS
// *****************************************************************************

function _load_logo() {
  let is_bgrt = 0;

  // Attempt to load custom logo first.
  let image = Image("custom/logo.png");
  // Otherwise try BGRT logo.
  if (!image) {
    image = Image("_bgrt/bgrt.png");
    if (image) {
      is_bgrt = 1;
    }
  }
  // Otherwise use fallbacks.
  if (!image) {
    image = Image("res/fallback.png") || new_empty_image();
  }

  let sprite = Sprite();
  sprite.SetOpacity(0.0);

  if (is_bgrt) {
    sprite.SetImage(image);
    let BGRT_X_OFFSET=0;
    let BGRT_Y_OFFSET=0;
    // Use same size and position as displayed by the UEFI.
    sprite_set_position_x(sprite, 0.50);
    sprite.SetY(BGRT_Y_OFFSET);
  }
  else {
    image = image_scale_to_xy(image, 0.375);
    sprite.SetImage(image);
    sprite_set_position_y(sprite, 0.25);
    sprite_set_position_x(sprite, 0.50);
  }

  return sprite;
}

function _load_watermark() {
  let sprite = Sprite();
  sprite.SetOpacity(0.0);

  // Only show custom watermark if found.
  let image = Image("res/watermark.png") || Image("custom/watermark.png") || new_empty_image();
  sprite.SetImage(image);

  sprite_set_position_y(sprite, 1.00);
  sprite_set_position_x(sprite, 0.50);

  return sprite;
}

/**
 * @callback fn_Logos_show
 * @returns {void}
 */
/**
 * @callback fn_Logos_hide
 * @returns {void}
 */
/**
 * @callback fn_Logos_show_opacity
 * @argument {float} opacity
 * @returns {void}
 */
/**
 * @typedef {Object} Logos
 *
 * @property {fn_Logos_show} show
 * @property {fn_Logos_hide} hide
 *
 * @property {Sprite} _logo
 * @property {Sprite} _watermark
 * @property {fn_Logos_show_opacity} _set_opacity
 */
/** @type {Logos} */
export let logos = {};
logos._logo = _load_logo();
logos._watermark = _load_watermark();
logos._set_opacity = function (opacity) {
  this._logo.SetOpacity(opacity);
  this._watermark.SetOpacity(opacity);
};
logos.show = function () {
  this._set_opacity(1.0);
};
logos.hide = function () {
  this._set_opacity(0.0);
};
