import { logos } from "lib/logo";
import { sprite_set_position_y_below_sprite } from "lib/positioning";
import { global_message } from "opt/message";

// *****************************************************************************
//   FIRMWARE
// *****************************************************************************

export function hide_firmware()
{
  logos.set_opacity(0.0);
}

/**
 * @param {boolean} execute
 *
 * @returns {boolean} Whether this display mode should be executed.
 */
export function display_firmware(execute)
{
  if (Plymouth.GetMode() != "firmware-upgrade") {
    hide_firmware();
    return false;
  }
  if (!execute) {
    return true;
  }

  logos.logo.SetOpacity(1.0);
  logos.watermark.SetOpacity(0.0);

  // TODO: Progress bar?
  sprite_set_position_y_below_sprite(logos.logo, global_message);

  return true;
}
