import { new_empty_image, WINDOW } from 'lib/global.js';
import { image_relscale_xy } from 'lib/positioning.js';
import { FramesContainer_new } from 'lib/types.js';

/** @typedef {import("./types.js").FramesContainer} FramesContainer */ //!!

// *****************************************************************************
//   SPINNER
// *****************************************************************************

/**
 * @param {string} style
 * @param {float} size
 * @param {int} frame_count
 * @param {int} frame_rows
 * @param {int} frame_cols
 *
 * @returns {FramesContainer}
 */
function _load_spinner_frames(style, size, frame_count, frame_rows, frame_cols)
{
  let fc = FramesContainer_new();
  fc.count = frame_count;

  let sheet = Image("res/gfx/throbber/" + style + ".png");
  if (!sheet) {
    let empty_img = new_empty_image();
    for (let i=0; i<fc.count; i++) {
      fc.frames[i] = empty_img;
    }
    return fc;
  }

  let frame_width  = Math.Int(sheet.GetWidth()  / frame_cols);
  let frame_height = Math.Int(sheet.GetHeight() / frame_rows);

  let i = 0;
  let done = false;
  while (!done) {
    let r = 0;
    while (r < frame_rows && !done) {
      let c = 0;
      while (c < frame_cols && !done) {
        let frame_img = sheet.Crop(
          frame_width  * c,
          frame_height * r,
          frame_width,
          frame_height
        );
        frame_img = image_relscale_xy(WINDOW, frame_img, size);
        fc.frames[i] = frame_img;

        c++; i++;
        if (i >= frame_count) {
          done = true;
        }
      }
      r++;
    }
  }

  return fc;
}

/**
 * @callback fn_Spinner_show
 * @returns {void}
 */
/**
 * @callback fn_Spinner_hide
 * @returns {void}
 */
/**
 * @callback fn_Spinner_animate
 * @returns {void}
 */
/**
 * @typedef {Object} Spinner
 *
 * @property {Sprite} sprite
 * @property {fn_Spinner_show} show
 * @property {fn_Spinner_hide} hide
 * @property {fn_Spinner_animate} animate Shows the next frame of the spinner.
 *
 * @property {boolean} _is_shown
 * @property {string}  _style
 * @property {FramesContainer} _frames
 * @property {int} _current_frame
 */
/**
 * Constructs a new Spinner object.
 *
 * @param {string} style
 * @param {float} size
 *
 * @returns {Spinner}
 */
export function new_Spinner(style, size)
{
  /** @type {Spinner} */
  let self = {};

  let frame_count = 0;
  if (style == "w8") {
    self._frames = _load_spinner_frames(style, size, 122, 7, 18);
  }
  if (style == "w10x") {
    self._frames = _load_spinner_frames(style, size, 119, 8, 15);
  }

  self._is_shown = true;
  self._style    = style;

  self._current_frame = self._frames.count;
  self.sprite = Sprite();
  self.sprite.SetOpacity(0.0);

  self.show = function ()
  {
    this._is_shown = true;
    this.sprite.SetOpacity(1.0);
  };
  self.hide = function ()
  {
    this._is_shown = false;
    this.sprite.SetOpacity(0.0);
  };
  self.animate = function ()
  {
    if (!this._is_shown) {
      return;
    }
    if (this._current_frame >= this._frames.count) {
      this._current_frame = 0;
    }
    this.sprite.SetImage(this._frames.frames[this._current_frame]);
    this._current_frame++;
  };

  self.animate();
  self.hide();
  return self;
}
