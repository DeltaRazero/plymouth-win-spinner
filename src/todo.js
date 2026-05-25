
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

// *****************************************************************************
//   PASSWORD
// *****************************************************************************

let password_prompt  = null;
let password_bullets = null;

/**
 * @param {string} prompt
 * @param {number} bullets
 */
function password_callback(prompt, bullets)
{
  spinner_disable();

  password_prompt = Sprite();
  password_prompt.SetImage( _Image.Text(prompt, 1.0, 1.0, 1.0) );

  sprite_set_position_x(password_prompt, 0.50);
  sprite_set_position_y(password_prompt, 0.675);

  let bullets_text = null;
  if (bullets) {
    bullets_text = "";
    for (let i=0; i<bullets; i++) {
      bullets_text = bullets_text + "*";
    }
  }
  else {
    bullets_text = "<password>";
  }

  password_bullets = Sprite();
  password_bullets.SetImage( _Image.Text(bullets_text, 1.0, 1.0, 1.0) );

  sprite_set_position_x(password_bullets, 0.50);
  sprite_set_position_y_below_sprite(password_prompt, password_bullets);
}
Plymouth.SetDisplayPasswordFunction(password_callback);
