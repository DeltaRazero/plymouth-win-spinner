import { new_empty_image, WINDOW } from "lib/global";
import { logos } from "lib/logo";
import { sprite_pos_x, sprite_pos_y, sprite_set_position_y_below_sprite } from "lib/positioning";
import { new_Spinner } from "lib/spinner";
import { global_message } from "opt/message";

// *****************************************************************************
//   SHUTDOWN
// *****************************************************************************

let _shutdown_spinner = new_Spinner("w8", 0.0493);
sprite_pos_x(WINDOW, _shutdown_spinner.sprite, 0.50);
sprite_pos_y(WINDOW, _shutdown_spinner.sprite, 0.72);

export function animate_shutdown()
{
  _shutdown_spinner.animate();
}

export function hide_shutdown()
{
  _shutdown_spinner.hide();
  logos.set_opacity(0.0);
}

/**
 * @param {boolean} execute
 *
 * @returns {boolean} Whether this display mode should be executed.
 */
export function display_shutdown(execute)
{
  let mode = Plymouth.GetMode();
  if (mode != "shutdown" && mode != "reboot") {
    hide_shutdown();
    return false;
  }
  if (!execute) {
    return true;
  }

  _shutdown_spinner.show();
  // TODO: Message for either shutdown or reboot.
  sprite_set_position_y_below_sprite(_shutdown_spinner.sprite, global_message);

  return true;
}
