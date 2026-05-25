import { logos } from "lib/logo";
import { sprite_set_position_y_below_sprite } from "lib/positioning";
import { global_message } from "message";

// *****************************************************************************
//   FIRMWARE
// *****************************************************************************

/**
 * @param {string} current_mode
 */
export function display_firmware(current_mode)
{
  if (current_mode != "firmware-upgrade") {
    logos.hide();
    return false;
  }

  logos._logo.SetOpacity(1.0);
  logos._watermark.SetOpacity(0.0);

  // TODO: Progress bar?
  sprite_set_position_y_below_sprite(logos._logo, global_message);

  return true;
}
