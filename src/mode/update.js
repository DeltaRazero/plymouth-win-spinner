import { new_empty_image } from "lib/global";
import { logos } from "lib/logo";
import { sprite_set_position_x, sprite_set_position_y, sprite_set_position_y_below_sprite } from "lib/positioning";
import { new_Spinner } from "lib/spinner";
import { global_message } from "opt/message";

// *****************************************************************************
//   UPDATE
// *****************************************************************************

let _update_spinner = new_Spinner("w8", 0.0493);
sprite_set_position_x(_update_spinner.sprite, 0.50);
sprite_set_position_y(_update_spinner.sprite, 0.72);

let _update_message_01 = Sprite(new_empty_image());
let _update_message_02 = Sprite(new_empty_image());

function _display_update_progress(progress)
{
  _update_message_01.SetImage( Image.Text("You're " + progress + "% there.", 1.0, 1.0, 1.0, 1.0, "Fixed") );
  sprite_set_position_x(_update_message_01, 0.5);
  sprite_set_position_y_below_sprite(_update_spinner.sprite, _update_message_01);
}
Plymouth.SetSystemUpdateFunction(_display_update_progress);

export function animate_update()
{
  _update_spinner.animate();
}

export function hide_update()
{
  _update_spinner.hide();
  logos.set_opacity(0.0);
  _update_message_01.SetOpacity(0.0);
  _update_message_02.SetOpacity(0.0);
}

/**
 * @param {boolean} execute
 *
 * @returns {boolean} Whether this display mode should be executed.
 */
export function display_update(execute)
{
  let mode = Plymouth.GetMode();
  if (mode != "system-upgrade" && mode != "updates") {
    _update_spinner.hide();
    logos.hide();
    _update_message_01.SetOpacity(0.0);
    _update_message_02.SetOpacity(0.0);
    return false;
  }
  if (!execute) {
    return true;
  }

  _update_spinner.show();

  _update_update_progress(0);
  _update_message_01.SetOpacity(1.0);

  _update_message_02.SetImage( Image.Text("Please keep your computer on.", 1.0, 1.0, 1.0, 1.0, "Fixed") );
  sprite_set_position_x(_update_message_02, 0.5);
  sprite_set_position_y_below_sprite(_update_message_01, _update_message_02);
  _update_message_02.SetOpacity(1.0);

  sprite_set_position_y_below_sprite(_update_spinner.sprite, global_message);

  return true;
}
