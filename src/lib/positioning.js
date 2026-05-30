// *****************************************************************************
//   POSITIONING
// *****************************************************************************

import { new_empty_image, WINDOW } from "lib/global";

// *****************************************************************************

/**
 * @param {Sprite} parent
 * @param {float} size
 *
 * @returns {int}
 */
export function calc_relsize_x(parent, size)
{
  let img_parent = parent.GetImage();
  if (!img_parent) {
    return 0;
  }
  return Math.Int(img_parent.GetWidth() * size);
}

/**
 * @param {Sprite} parent
 * @param {float} size
 *
 * @returns {int}
 */
export function calc_relsize_y(parent, size)
{
  let img_parent = parent.GetImage();
  if (!img_parent) {
    return 0;
  }
  return Math.Int(img_parent.GetHeight() * size);
}

// *****************************************************************************

/**
 * @param {number} value
 *
 * @returns {int}
 */
export function em_x(value)
{
  return calc_relsize_x(WINDOW, value / 100);
}

/**
 * @param {number} value
 *
 * @returns {int}
 */
export function em_y(value)
{
  return calc_relsize_y(WINDOW, value / 100);
}

/**
 * @param {Sprite} parent
 * @param {number} value
 *
 * @returns {int}
 */
export function rem_x(parent, value)
{
  return calc_relsize_x(parent, value / 100);
}

/**
 * @param {Sprite} parent
 * @param {number} value
 *
 * @returns {int}
 */
export function rem_y(parent, value)
{
  return calc_relsize_y(parent, value / 100);
}

// *****************************************************************************

/**
 * Sets a sprite's X position within the width of a container sprite.
 *
 * @param {Sprite} container
 * @param {Sprite} sprite
 * @param {float} pos
 *   Percentage (float) within the container where to relocate the sprite.
 */
export function sprite_pos_x(container, sprite, pos)
{
  let img_container = container.GetImage();
  let img_sprite = sprite.GetImage();
  if (!(img_container && img_sprite)) {
    return;
  }

  let max_x = img_container.GetWidth() - img_sprite.GetWidth();
  sprite.SetX( container.GetX() +  Math.Int(pos * max_x) );
}

/**
 * Sets a sprite's Y position within the height of a container sprite.
 *
 * @param {Sprite} container
 * @param {Sprite} sprite
 * @param {float} pos
 *   Percentage (float) within the container where to relocate the sprite.
 */
export function sprite_pos_y(container, sprite, pos)
{
  let img_container = container.GetImage();
  let img_sprite = sprite.GetImage();
  if (!(img_container && img_sprite)) {
    return;
  }

  let max_y = img_container.GetHeight() - img_sprite.GetHeight();
  sprite.SetY( container.GetY() + Math.Int(pos * max_y) );
}

// *****************************************************************************

/**
 * Sets a sprite's X position relative to the width of a neighboring sprite.
 *
 * @param {Sprite} neighbor
 * @param {Sprite} sprite
 * @param {float} value
 *   Position relative to the neighbor where to relocate the sprite. A negative
 *   value will move the sprite left of the neighbor, a positive to the right.
 */
export function sprite_relpos_x(neighbor, sprite, value)
{
  let img_neighbor = neighbor.GetImage();
  let img_sprite   = sprite.GetImage();
  if (!(img_neighbor && img_sprite)) {
    return;
  }
  // if (String(value)[0] == "-") {
  if (value < 0) {
    sprite.SetX( (neighbor.GetX() - img_sprite.GetWidth()) + value );
  }
  else {
    sprite.SetX( (neighbor.GetX() + img_neighbor.GetWidth()) + value );
  }
}

/**
 * Sets a sprite's Y position relative to the height of a neighboring sprite.
 *
 * @param {Sprite} neighbor
 * @param {Sprite} sprite
 * @param {float} value
 *   Position relative to the neighbor where to relocate the sprite. A negative
 *   value will move the sprite above the neighbor, a positive to below.
 */
export function sprite_relpos_y(neighbor, sprite, value)
{
  let img_neighbor = neighbor.GetImage();
  let img_sprite   = sprite.GetImage();
  if (!(img_neighbor && img_sprite)) {
    return;
  }
  // if (String(value)[0] == "-") {
  if (value < 0) {
    sprite.SetY( (neighbor.GetY() - img_sprite.GetHeight()) + value );
  }
  else {
    sprite.SetY( (neighbor.GetY() + img_neighbor.GetHeight()) + value );
  }
}

// *****************************************************************************

/**
 * @param {Sprite} parent
 * @param {Image} image
 * @param {float} size
 *
 * @returns {Image}
 */
export function image_relscale_x(parent, image, size)
{
  if (!parent.GetImage()) {
    return image;
  }
  let new_width = calc_relsize_x(parent, size);
  // Maintain aspect-ratio.
  let new_height = Math.Int(image.GetHeight() * (new_width / image.GetWidth()));
  return image.Scale(new_width, new_height);
}

/**
 * @param {Sprite} parent
 * @param {Image} image
 * @param {float} size
 *
 * @returns {Image}
 */
export function image_relscale_y(parent, image, size)
{
  if (!parent.GetImage()) {
    return image;
  }
  let new_height = calc_relsize_y(parent, size);
  // Maintain aspect-ratio.
  let new_width = Math.Int(image.GetWidth() * (new_height / image.GetHeight()));
  return image.Scale(new_width, new_height);
}

/**
 * Uses the biggest dimension.
 *
 * @param {Sprite} parent
 * @param {Image} image
 * @param {float} size
 *   Percentage (float) how big it should be on the screen.
 *
 * @returns {Image}
 */
export function image_relscale_xy(parent, image, size)
{
  if (image.GetWidth() > image.GetHeight()) {
    return image_relscale_x(parent, image, size);
  }
  return image_relscale_y(parent, image, size);
}

// *****************************************************************************

/**
 * @param {int} width
 * @param {int} height
 */
export function make_container(width, height)
{
  return Image.Text(" ", 0.0, 0.0, 0.0, 0.0, "Fixed").Scale(width, height);
}
