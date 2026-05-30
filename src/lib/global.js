/**
 * @returns {Image}
 */
export function new_empty_image()
{
  return Image.Text("", 0.0, 0.0, 0.0, 0.0, "Fixed");
}

/** Special sprite that captures the whole window for positioning. */
export let WINDOW = Sprite();
WINDOW.SetOpacity(0.0);
WINDOW.SetImage( new_empty_image().Scale(Window.GetWidth(), Window.GetHeight()) );
WINDOW.SetX(0);
WINDOW.SetY(0);
