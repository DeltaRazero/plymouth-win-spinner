import { animate_boot, display_boot } from 'mode/boot.js';
import { display_firmware } from 'mode/firmware.js';
import { animate_update, display_update } from 'mode/update.js';
import { animate_shutdown, display_shutdown } from 'mode/shutdown.js';

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

import {} from './message.js';

import {} from './mode/boot.js';
import {} from './mode/firmware.js';
import {} from './mode/shutdown.js';
import {} from './mode/unknown.js';
import {} from './mode/update.js';

// *****************************************************************************
//   MAIN
// *****************************************************************************

Window.SetBackgroundTopColor(0, 0, 0);
Window.SetBackgroundBottomColor(0, 0, 0);

function display_normal_callback()
{
  let mode = Plymouth.GetMode();

  let stop = false;
  if (!stop) { stop = display_boot(mode); }
  if (!stop) { stop = display_firmware(mode); }
  if (!stop) { stop = display_update(mode); }
  if (!stop) { stop = display_shutdown(mode); }
}
Plymouth.SetDisplayNormalFunction(display_normal_callback);

function refresh_callback()
{
  animate_boot();
  animate_update();
  animate_shutdown();
}
Plymouth.SetRefreshFunction(refresh_callback);
Plymouth.SetRefreshRate(50);
