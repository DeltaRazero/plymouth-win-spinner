import { WINDOW } from "lib/global";
import { logos } from "lib/logo";
import { em_y, sprite_pos_x, sprite_pos_y, sprite_relpos_y } from "lib/positioning";
import { new_Spinner } from "lib/spinner";
import { global_message } from "opt/message";

// *****************************************************************************
//   BOOT
// *****************************************************************************

let _boot_spinner = new_Spinner("w10x", 0.065);
sprite_pos_x(WINDOW, _boot_spinner.sprite, 0.50);
sprite_pos_y(WINDOW, _boot_spinner.sprite, 0.75);

export function animate_boot()
{
  _boot_spinner.animate();
}

export function hide_boot()
{
  _boot_spinner.hide();
  logos.set_opacity(0.0);
}

/**
 * @param {boolean} execute
 *
 * @returns {boolean} Whether this display mode should be executed.
 */
export function display_boot(execute)
{
  if (Plymouth.GetMode() != "boot") {
    hide_boot();
    return false;
  }
  if (!execute) {
    return true;
  }

  logos.set_opacity(1.0);
  _boot_spinner.show();

  sprite_relpos_y(_boot_spinner.sprite, global_message, em_y(5));

  return true;
}
