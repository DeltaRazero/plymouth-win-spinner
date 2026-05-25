import { new_empty_image } from "lib/global";
import { logos } from "lib/logo";
import { sprite_set_position_x, sprite_set_position_y, sprite_set_position_y_below_sprite } from "lib/positioning";
import { new_Spinner } from "lib/spinner";
import { global_message } from "message";

// *****************************************************************************
//   UPDATE
// *****************************************************************************

let _update_spinner = new_Spinner("w8");
sprite_set_position_x(_update_spinner.sprite, 0.50);
sprite_set_position_y(_update_spinner.sprite, 0.72);

let _update_message_01 = Sprite(new_empty_image());
let _update_message_02 = Sprite(new_empty_image());

function _update_update_progress(progress)
{
  _update_message_01.SetImage( Image.Text("You're " + progress + "% there.", 1.0, 1.0, 1.0, 1.0, "Fixed") );
  sprite_set_position_x(_update_message_01, 0.5);
  sprite_set_position_y_below_sprite(_update_spinner.sprite, _update_message_01);
}
Plymouth.SetSystemUpdateFunction(_update_update_progress);

/**
 * @param {string} current_mode
 */
export function display_update(current_mode)
{
  if (current_mode != "system-upgrade" && current_mode != "updates") {
    _update_spinner.hide();
    logos.hide();
    _update_message_01.SetOpacity(0.0);
    _update_message_02.SetOpacity(0.0);
    return false;
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

export function animate_update()
{
  _update_spinner.animate();
}
