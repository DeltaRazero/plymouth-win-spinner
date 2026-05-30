
// *****************************************************************************
//   PROGRESS
// *****************************************************************************

function progress_callback(time, progress) {

}
Plymouth.SetBootProgressFunction(progress_callback);

// *****************************************************************************
//   QUESTION
// *****************************************************************************

let question_prompt = null;
let question_answer = null;

/**
 * @param {string} prompt
 * @param {string} entry
 */
function question_callback(prompt, entry)
{
  spinner_disable();

  question_prompt = Sprite();
  question_prompt.SetImage( _Image.Text(prompt, 1.0, 1.0, 1.0) );

  sprite_set_position_x(question_prompt, 0.50);
  sprite_set_position_y(question_prompt, 0.675);

  if (!entry) {
    entry = "<answer>";
  }
  question_answer = Sprite();
  question_answer.SetImage( _Image.Text(entry, 1.0, 1.0, 1.0) );

  sprite_set_position_x(question_prompt, 0.50);
  sprite_set_position_y_below_sprite(question_prompt, question_answer);
}
Plymouth.SetDisplayQuestionFunction(question_callback);
