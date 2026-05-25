// *****************************************************************************
//   POSITIONING
// *****************************************************************************

import { new_empty_image } from "lib/global";

let WINDOW_AREA = 0.925;
let WINDOW_H_USABLE = (Window.GetHeight() * WINDOW_AREA);
let WINDOW_H_OFFSET = (Window.GetHeight() - WINDOW_H_USABLE) / 2.0;
let WINDOW_W_USABLE = (Window.GetWidth() * WINDOW_AREA);
let WINDOW_W_OFFSET = (Window.GetWidth() - WINDOW_W_USABLE) / 2.0;

/**
 * @param {Sprite} sprite
 * @param {float} screen_pos
 *   Percentage (float) where to put it on the screen.
 */
export function sprite_set_position_y(sprite, screen_pos) {
  let image = sprite.GetImage();
  if (!image) {
    return;
  }
  let travel_range = WINDOW_H_USABLE - image.GetHeight();
  sprite.SetY( Math.Int( (screen_pos * travel_range) + WINDOW_H_OFFSET ) );
}

/**
 * @param {Sprite} sprite
 * @param {float} screen_pos
 *   Percentage (float) where to put it on the screen.
 */
export function sprite_set_position_x(sprite, screen_pos) {
  let image = sprite.GetImage();
  if (!image) {
    return;
  }
  let travel_range = WINDOW_W_USABLE - image.GetWidth();
  sprite.SetX( Math.Int( (screen_pos * travel_range) + WINDOW_W_OFFSET ) );
}

/**
 * @param {Sprite} sprite_above
 * @param {Sprite} sprite_below
 */
export function sprite_set_position_y_below_sprite(sprite_above, sprite_below) {
  let image = sprite_above.GetImage() || new_empty_image();
  sprite_below.SetY(sprite_above.GetY() + image.GetHeight() + 20);
}

/**
 * @param {Image} image
 * @param {float} size
 *   Percentage (float) how big it should be on the screen.
 */
export function image_scale_to_x(image, size) {
  let new_width  = Math.Int(WINDOW_W_USABLE * size);
  let new_height = Math.Int(image.GetHeight() * (new_width / image.GetWidth()));
  return image.Scale(new_width, new_height);
}

/**
 * @param {Image} image
 * @param {float} size
 *   Percentage (float) how big it should be on the screen.
 */
export function image_scale_to_y(image, size) {
  let new_height = Math.Int(WINDOW_H_USABLE * size);
  let new_width  = Math.Int(image.GetWidth() * (new_height / image.GetHeight()));
  return image.Scale(new_width, new_height);
}

/**
 * Uses the biggest dimension.
 *
 * @param {Image} image
 * @param {float} size
 *   Percentage (float) how big it should be on the screen.
 */
export function image_scale_to_xy(image, size) {
  if (image.GetWidth() > image.GetHeight()) {
    return image_scale_to_x(image, size);
  }
  return image_scale_to_y(image, size);
}
