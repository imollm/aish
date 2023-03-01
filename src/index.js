import { CLI } from './cli.js'
import { OpenAPIService } from './service.js'

const cli = new CLI()
const service = new OpenAPIService()

const prompt = await cli.getPrompt()
const result = await service.sendPrompt({ prompt })
const exec = await cli.showResult({ result })

if (exec) {
  await cli.execCmd({ cmd: result })
}
