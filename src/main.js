import { animate_boot, display_boot } from 'mode/boot.js';
import { display_firmware } from 'mode/firmware.js';
import { animate_update, display_update } from 'mode/update.js';
import { animate_shutdown, display_shutdown } from 'mode/shutdown.js';
import { animate_password, display_password } from 'mode/password.js';

// *****************************************************************************
//   CUSTOMIZATION
// *****************************************************************************

// Load your own logo by having ./custom/logo.png and ./custom/watermark.png

// *****************************************************************************

// Global imports for the Plymouth script.
import {} from './lib/global.js';
import {} from './lib/types.js';
import {} from './lib/positioning.js';
import {} from './lib/logo.js';
import {} from './lib/spinner.js';

import {} from './opt/message.js';

import {} from './mode/boot.js';
import {} from './mode/firmware.js';
import {} from './mode/shutdown.js';
// import {} from './mode/unknown.js';
import {} from './mode/update.js';
import {} from './mode/password.js';

// *****************************************************************************
//   MAIN
// *****************************************************************************

Window.SetBackgroundTopColor(0, 0, 0);
Window.SetBackgroundBottomColor(0, 0, 0);

function display_normal_callback()
{
  /**
   * @callback fn_display_function_ref
   * @argument {boolean} execute
   * @returns {boolean}
   */
  /** @var {fn_display_function_ref|null} display_function */
  let display_function = null;

  if (display_boot(false))     { display_function = display_boot; }
  if (display_password(false)) { display_function = display_password; }
  if (display_firmware(false)) { display_function = display_firmware; }
  if (display_update(false))   { display_function = display_update; }
  if (display_shutdown(false)) { display_function = display_shutdown; }

  if (display_function) {
    display_function(true);
  }
}
Plymouth.SetDisplayNormalFunction(display_normal_callback);

function refresh_callback()
{
  animate_boot();
  animate_update();
  animate_shutdown();
  animate_password();
}
Plymouth.SetRefreshFunction(refresh_callback);
Plymouth.SetRefreshRate(50);
