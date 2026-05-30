import { new_empty_image, WINDOW } from "lib/global";
import { logos } from "lib/logo";
import { image_relscale_xy, image_relscale_y, make_container, sprite_pos_x, sprite_pos_y, sprite_relpos_y } from "lib/positioning";
import { display_shutdown } from "mode/shutdown";

// *****************************************************************************
//   PASSWORD
// *****************************************************************************

let _password_is_shown = false;
let _password_is_setup = false;

let _password_input_box_title = Sprite();
_password_input_box_title.SetOpacity(0.0);

let _password_input_box = Sprite();
_password_input_box.SetOpacity(0.0);
_password_input_box.SetZ(0);

let _password_input_box_capslock_icon = {};
_password_input_box_capslock_icon.sprite = Sprite();
_password_input_box_capslock_icon.sprite.SetZ(10);
_password_input_box_capslock_icon.icon_on  = new_empty_image();
_password_input_box_capslock_icon.icon_off = new_empty_image();
_password_input_box_capslock_icon.state    = false;

let _password_input_box_cursor = Sprite();
_password_input_box_cursor.SetOpacity(0.0);
_password_input_box_cursor.SetZ(10);

let _password_prompt = Sprite();
_password_prompt.SetOpacity(0.0);

let _password_bullets = Sprite();
_password_bullets.SetOpacity(0.0);
_password_bullets.SetZ(10);

/**
 * @param {float} value
 */
function _password_set_elements_opacity(value)
{
  _password_input_box_title.SetOpacity(value);
  _password_input_box.SetOpacity(value);
  _password_input_box_capslock_icon.sprite.SetOpacity(value);
  _password_input_box_cursor.SetOpacity(value);
  _password_prompt.SetOpacity(value);
  _password_bullets.SetOpacity(value);
}

/**
 * @param {boolean} do_render_icons
 */
function _password_handle_capslock(do_render_icons)
{
  let capslock_state = Plymouth.GetCapslockState();
  if (!do_render_icons && _password_is_setup && capslock_state == _password_input_box_capslock_icon.state) {
    return;
  }

  if (do_render_icons) {
    let size = 0.575;
    _password_input_box_capslock_icon.icon_on = image_relscale_y(
      _password_input_box,
      Image("res/gfx/icon/ic_fluent_lock_closed_24_filled.png") || new_empty_image(),
      size
    );
    _password_input_box_capslock_icon.icon_off = image_relscale_y(
      _password_input_box,
      Image("res/gfx/icon/ic_fluent_lock_closed_24_regular.png") || new_empty_image(),
      size
    );
  }

  if (capslock_state) {
    _password_input_box_capslock_icon.sprite.SetImage(_password_input_box_capslock_icon.icon_on);
  }
  else {
    _password_input_box_capslock_icon.sprite.SetImage(_password_input_box_capslock_icon.icon_off);
  }
}

export function animate_password()
{
  if (!(_password_is_shown && _password_is_setup)) {
    return;
  }

  _password_handle_capslock(false);
}

export function hide_password()
{
  logos.set_opacity(0.0);
  _password_set_elements_opacity(0.0);
}

/**
 * @param {boolean} execute
 * @param {string} prompt
 * @param {number} bullets
 * @param {boolean} is_password_mode
 */
function _password_display_password(execute, prompt, bullets, is_password_mode)
{
  if (!is_password_mode) {
    _password_is_shown = false;
    hide_password();
    return false;
  }
  if (!execute) {
    return true;
  }

  if (!_password_is_setup) {
    _password_input_box.SetImage(image_relscale_xy(
      WINDOW,
      Image("res/gfx/ctn/input_box.png") || make_container(512, 72),
      0.25
    ));
    sprite_pos_x(WINDOW, _password_input_box, 0.50);
    sprite_pos_y(WINDOW, _password_input_box, 0.45);

    _password_input_box_title.SetImage(image_relscale_xy(
      _password_input_box,
      Image.Text("Enter Disk Passphrase", 1.0, 1.0, 1.0, 1.0, "Sans Bold 48"),
      0.65
    ));
    sprite_pos_x(_password_input_box, _password_input_box_title, 0.50);
    sprite_relpos_y(_password_input_box, _password_input_box_title, -6);

    _password_handle_capslock(true);
    sprite_pos_x(_password_input_box, _password_input_box_capslock_icon.sprite, 0.0275);
    sprite_pos_y(_password_input_box, _password_input_box_capslock_icon.sprite, 0.475);

    _password_is_setup = true;
  }

  logos.set_opacity(0.0);

  _password_set_elements_opacity(1.0);
  _password_is_shown = true;
  return true;
}

/**
 * @param {string} prompt
 * @param {number} bullets
 */
function _display_password_callback(prompt, bullets)
{
  _password_display_password(true, prompt, bullets, true);
}
Plymouth.SetDisplayPasswordFunction(_display_password_callback);

/**
 * @param {boolean} execute
 *
 * @returns {boolean} Whether this display mode should be executed.
 */
export function display_password(execute)
{
  return _password_display_password(execute, "", 0, false);
}

/**
 * @param {string} prompt
 * @param {number} bullets
 */
// function password_callback(prompt, bullets)
// {
//   let bullets_text = null;
//   if (bullets) {
//     bullets_text = "";
//     for (let i=0; i<bullets; i++) {
//       bullets_text = bullets_text + "*";
//     }
//   }
//   else {
//     bullets_text = "<password>";
//   }

//   password_bullets = Sprite();
//   password_bullets.SetImage( _Image.Text(bullets_text, 1.0, 1.0, 1.0) );

//   sprite_set_position_x(password_bullets, 0.50);
//   sprite_set_position_y_below_sprite(password_prompt, password_bullets);
// }
