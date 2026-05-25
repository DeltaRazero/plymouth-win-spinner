/**
 * @typedef {Object} FramesContainer
 *
 * @property {Object.<number, Image>} frames Images.
 * @property {int} count Amount of images.
 */

/**
 * @returns {FramesContainer}
 */
export function FramesContainer_new()
{
  /** @type {FramesContainer} */
  let self = {};
  self.frames = {};
  self.count  = 0;

  return self;
}
