import { new_empty_image } from './global.js';
import { image_scale_to_y } from './positioning.js';
import { FramesContainer_new } from './types.js';

/** @typedef {import("./types.js").FramesContainer} FramesContainer */ //!!

// *****************************************************************************
//   SPINNER
// *****************************************************************************

/**
 * @param {string} style
 * @param {int} frame_count
 *
 * @returns {FramesContainer}
 */
function _load_spinner_frames(style, frame_count)
{
  let fc = FramesContainer_new();
  fc.count = frame_count;

  for (let i=0; i<fc.count; i++) {
    let frame_img = Image("res/throbber/" + style + "/spinner-" + i + ".png") || new_empty_image();
    frame_img = image_scale_to_y(frame_img, 0.0493);
    fc.frames[i] = frame_img;
  }

  return fc;
}

/** @type {Object.<string, FramesContainer>} */
let _spinner_frames = {};
_spinner_frames["w8"]   = _load_spinner_frames("w8",   122);
_spinner_frames["w10x"] = _load_spinner_frames("w10x", 119);

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
 * @property {int}  _current_frame
 */
/**
 * Constructs a new Spinner object.
 *
 * @param {string} style
 *
 * @returns {Spinner}
 */
export function new_Spinner(style)
{
  /** @type {Spinner} */
  let self = {};

  self._is_shown = true;
  self._style    = style;
  self._current_frame = _spinner_frames[style].count;
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
    if (this._current_frame >= _spinner_frames[this._style].count) {
      this._current_frame = 0;
    }
    this.sprite.SetImage(_spinner_frames[this._style].frames[this._current_frame]);
    this._current_frame++;
  };

  self.animate();
  self.hide();
  return self;
}
