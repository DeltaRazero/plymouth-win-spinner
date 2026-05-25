import { new_empty_image } from "lib/global";
import { logos } from "lib/logo";
import { sprite_set_position_x, sprite_set_position_y, sprite_set_position_y_below_sprite } from "lib/positioning";
import { new_Spinner } from "lib/spinner";
import { global_message } from "message";

// *****************************************************************************
//   SHUTDOWN
// *****************************************************************************

let _shutdown_spinner = new_Spinner("w8");
sprite_set_position_x(_shutdown_spinner.sprite, 0.50);
sprite_set_position_y(_shutdown_spinner.sprite, 0.72);

/**
 * @param {string} current_mode
 */
export function display_shutdown(current_mode)
{
  if (current_mode != "shutdown" && current_mode != "reboot") {
    _shutdown_spinner.hide();
    logos.hide();
    return false;
  }

  _shutdown_spinner.show();
  // TODO: Message for either shutdown or reboot.
  sprite_set_position_y_below_sprite(_shutdown_spinner.sprite, global_message);

  return true;
}

export function animate_shutdown()
{
  _shutdown_spinner.animate();
}
