import { logos } from "lib/logo";
import { sprite_set_position_x, sprite_set_position_y, sprite_set_position_y_below_sprite } from "lib/positioning";
import { new_Spinner } from "lib/spinner";
import { global_message } from "message";

// *****************************************************************************
//   BOOT
// *****************************************************************************

let _boot_spinner = new_Spinner("w10x");
sprite_set_position_x(_boot_spinner.sprite, 0.50);
sprite_set_position_y(_boot_spinner.sprite, 0.72);

/**
 * @param {string} current_mode
 */
export function display_boot(current_mode)
{
  if (current_mode != "boot") {
    _boot_spinner.hide();
    logos.hide();
    return false;
  }

  logos.show();
  _boot_spinner.show();
  sprite_set_position_y_below_sprite(_boot_spinner.sprite, global_message);

  return true;
}

export function animate_boot()
{
  _boot_spinner.animate();
}
