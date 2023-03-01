import { outro, confirm } from '@clack/prompts'
import colors from 'picocolors'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

export class CLI {
  constructor () {
    this.prompt = ''
  }

  async getPrompt () {
    const input = process.argv.slice(2)

    if (input.length === 0) {
      this.handleExit({ code: 0, message: 'You have to type something.' })
    }

    this.prompt = input.join(' ')

    return this.prompt
  }

  async showResult ({ result }) {
    outro(colors.green(result))

    return await confirm({
      initialValue: false,
      message: colors.yellow('Do you want to execute this command?')
    })
  }

  async execCmd ({ cmd }) {
    try {
      const execAsync = promisify(exec)
      const { stdout } = await execAsync(cmd)

      outro(colors.blue(stdout))
    } catch (error) {
      this.handleExit({ code: 1, message: error })
    }
  }

  handleExit ({ code = 0, message = 'Error executing the command.' } = {}) {
    code === 0
      ? outro(colors.yellow(message))
      : outro(colors.red(message))
    process.exit(code)
  }
}
