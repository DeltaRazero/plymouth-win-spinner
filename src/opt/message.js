import { new_empty_image } from "lib/global";
import { sprite_set_position_x, sprite_set_position_y } from "lib/positioning";

// *****************************************************************************
//   MESSAGE
// *****************************************************************************

export let global_message = Sprite( new_empty_image() );
sprite_set_position_y(global_message, 0.50);

/**
 * @param {string} message
 */
function message_callback(message)
{
  global_message.SetOpacity(0.0);
  global_message.SetImage( Image.Text(message, 1.0, 1.0, 1.0, 1.0, "Fixed") );

  sprite_set_position_x(global_message, 0.50);

  // sprite_set_position_y_below_sprite(spinner, global_message); // TODO:

  global_message.SetOpacity(1.0);
}
Plymouth.SetDisplayMessageFunction(message_callback);

function hide_message_callback()
{
  global_message.SetOpacity(0.0);
}
Plymouth.SetHideMessageFunction(hide_message_callback);
