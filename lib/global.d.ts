// This empty export forces the file to be treated as a module, which allows us
// to hook into the global scope.
export {};

declare global {

// *****************************************************************************

type float = number;
type int = number;

// *****************************************************************************

interface Image
{
  Adopt(raw_image: any): Array|Image|null;

  Rotate(angle: float): Image;

  Crop(x: float, y: float, width: float, height: float): Image;

  Scale(width: int, height: int): Image;

  Tile(width: int, height: int): Image;

  GetWidth(): int;

  GetHeight(): int;
}

namespace Image
{
  export function Text (text: string, red: float, green: float, blue: float, alpha: float=1.0, font: string="", align: ("left"|"center"|"right")="left"): Image;
}

function Image(filename: string): Image|null;

// *****************************************************************************

namespace Math
{
  export function Abs(value: number): number;

  export function Min(value_a: number, value_b: number): number;

  export function Max(value_a: number, value_b: number): number;

  export const Pi = 3.14159265359;

  export function Cos(value: number): float;

  export function Sin(value: number): float;

  export function Tan(value: number): float;

  export function ATan2(value_a: number, value_b: number): float;

  export function Sqrt(value: number): float;

  export function Int(value: number): int;

  export function Random(): int;
}

// *****************************************************************************

// https://wiki.gentoo.org/wiki/User:DerpDays/Plymouth/Theming
namespace Plymouth
{
  /**
   * The refresh function is called `x` amount of times per second, where `x`
   * is the refresh rate set with `Plymouth.SetRefreshRate` or the default
   * value (50).
   */
  export function SetRefreshFunction(callback: () => void): void;

  /**
   * Sets the amount of times the refresh function is called per second.
   */
  export function SetRefreshRate(value: int): void;

  /**
   * The boot progress function is called whenever progress is made during the
   * boot process.
   *
   * Called with two numbers, time spent booting so far and the progress as
   * value between 0 and 1.
   */
  export function SetBootProgressFunction(callback: (time: int, progress: float) => void): void;

  /**
   * The root mounted function is called when the root partition is mounted
   * (needs verification).
   */
  export function SetRootMountedFunction(callback: () => void): void;

  /**
   * The keyboard input function is called whenever input is made on a keyboard.
   * This does not trigger on non-text characters such as return (needs verification).
   *
   * Called with a string containing a new character entered on the keyboard.
   */
  export function SetKeyboardInputFunction(callback: (char: string) => void): void;

  /**
   * Called with the new boot status string.
   */
  export function SetUpdateStatusFunction(callback: (status: string) => void): void;

  /**
   * This is called whenever the display should return to normal.
   */
  export function SetDisplayNormalFunction(callback: () => void): void;

  /**
   * This is called whenever the display should show a password prompt.
   *
   * First arg is prompt string, the second is the number of characters entered.
   */
  export function SetDisplayPasswordFunction(callback: (prompt: string, bullets: int) => void): void;

  /**
   * Called when the display should display a question dialogue.
   *
   * First arg is prompt string, the second is the entry contents.
   */
  export function SetDisplayQuestionFunction(callback: (prompt: string, contents: string) => void): void;

  /**
   * This is called whenever a prompt needs displaying.
   *
   * Prompt and contents are strings and is_secret is a bool.
   */
  export function SetDisplayPromptFunction(callback: (prompt: string, contents: string, is_secret: boolean) => void): void;

  /**
   * This is called whenever a device is hotplugged into the machine.
   */
  export function SetDisplayHotplugFunction(callback: () => void): void;

  /**
   * This is called whenever an input needs validation.
   *
   * contents and additional_text are both strings, the function expects a
   * boolean return value if the input is valid.
   */
  export function SetValidateInputFunction(callback: () => boolean): void;

  /**
   * Called when new message should be displayed.
   *
   * First arg is message to display.
   */
  export function SetDisplayMessageFunction(callback: (message: string) => void): void;

  /**
   * This is called to hide a previously shown message.
   */
  export function SetHideMessageFunction(callback: () => void): void;

  /**
   * This is called when Plymouth is quitting.
   */
  export function SetQuitFunction(callback: () => void): void;

  /**
   * Returns a boolean depicting the current capslock state (true=on, false=off).
   */
  export function GetCapslockState(): boolean;

  /**
   * ...
   */
  export function GetMode(): ("boot"|"shutdown"|"reboot"|"updates"|"system-upgrade"|"firmware-upgrade"|"system-reset"|"unknown");

  /**
   * This is called when there is a system update.
   */
  export function SetSystemUpdateFunction(callback: (progress: int) => void): void;
}

// *****************************************************************************

interface Sprite
{
  GetImage(): Image|null;

  SetImage(image: Image): void;

  GetX(): int;

  SetX(value: int): void;

  GetY(): int;

  SetY(value: int): void;

  GetZ(): int;

  SetZ(value: int): void;

  SetPosition(x: int, y: int, z: int): void;

  GetOpacity(): float;

  SetOpacity(value: float);
}

function Sprite(image: Image|null=null): Sprite;

// *****************************************************************************

namespace Window
{
  export function GetWidth(): int;

  export function GetHeight(): int;

  export function GetX(): int;

  export function GetY(): int;

  export function SetX(value: int): void;

  export function SetY(value: int): void;

  export function SetBackgroundTopColor(red: float, green: float, blue: float): void;

  export function SetBackgroundBottomColor(red: float, green: float, blue: float): void;
}

// *****************************************************************************

interface String {
  /**
   * @param {int} index
   * @returns {string}
   */
  CharAt(index): string;

  /**
   * @param {int} start
   * @param {int} end
   * @returns {string}
   */
  SubString(start, end): string;

  /**
   * @returns {int}
   */
  Length(): int;
}

// *****************************************************************************

}
