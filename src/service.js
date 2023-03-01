import { outro } from '@clack/prompts'
import colors from 'picocolors'

export class OpenAPIService {
  constructor () {
    this.apiKey = ''
    this.checkApiKey()
    this.endpoint = 'https://api.openai.com/v1/completions'
  }

  checkApiKey () {
    if (!Object.prototype.hasOwnProperty.call(process.env, 'OPENAI_API_KEY')) {
      outro(
        colors.red('AISH needs and API KEY, please go to https://openai.com')
      )
      process.exit(1)
    }

    this.apiKey = process.env.OPENAI_API_KEY
  }

  async sendPrompt ({ prompt }) {
    try {
      const userPrompt = `Convert this text to a programmatic command:
Example: How to create a new folder called test inside /opt folder
Output: cd /opt && mkdir test

Example: Find a file by it's name (it's name is test.txt)
Output: find / -name test.txt

Example: ${prompt} :::`

      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: userPrompt,
          temperature: 0,
          max_tokens: 100,
          top_p: 1.0,
          frequency_penalty: 0.2,
          presence_penalty: 0.0,
          stop: [':::']
        })
      })

      const json = await res.json()

      if ((json && json.error) || !res.ok) {
        throw new Error()
      }

      if (
        !Object.prototype.hasOwnProperty.call(json, 'choices') ||
        json.choices.length < 1 ||
        !Object.prototype.hasOwnProperty.call(json.choices[0], 'text') ||
        json.choices[0].text === '') {
        throw new Error()
      }

      return json.choices[0].text.split('\nOutput:')[1]
    } catch (error) {
      outro(
        colors.red('Error, please try it again in a while.')
      )
      process.exit(1)
    }
  }
}
