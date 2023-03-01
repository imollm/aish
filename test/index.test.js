import { describe, expect, it, vi, expectTypeOf } from 'vitest'
import { CLI } from '../src/cli'
import { OpenAPIService } from '../src/service'

// This function is to mock process.exit(ERROR_CODE) to avoid to finish the tests
const processExitSpyOn = vi.spyOn(process, 'exit').mockImplementation(() => {
  throw new Error()
})

describe('AISH Test Suite', () => {
  describe('Test custom classes', () => {
    it('should get an instance of CLI object', async () => {
      // Arrange
      let cliObj = null

      // Act
      cliObj = new CLI()

      // Assert
      expect(cliObj).toBeInstanceOf(CLI)
    })

    it('should get an instance of OpenAIService object', async () => {
      // Arrange
      let serviceObj = null

      // Act
      serviceObj = new OpenAPIService()

      // Assert
      expect(serviceObj).toBeInstanceOf(OpenAPIService)
    })
  })

  describe('Test program flow', () => {
    it('should finish the process when no prompt', async () => {
      // Arrange
      const prompt = ''
      const cliObj = new CLI()
      process.argv[2] = prompt

      // Act
      await cliObj.getPrompt()

      // Assert
      expect(processExitSpyOn).toThrowError()
      processExitSpyOn.mockRestore()
    })

    it('should get prompt from user', async () => {
      // Arrange
      const prompt = 'Check zshrc file contents'
      const cliObj = new CLI()
      process.argv[2] = prompt

      // Act
      const cleanPrompt = await cliObj.getPrompt()

      // Assert
      expect(cleanPrompt).toEqual(prompt)
    })

    it('should get a response from service', async () => {
      // Arrange
      const prompt = 'Check zshrc file contents'
      const cliObj = new CLI()
      const serviceObj = new OpenAPIService()
      process.argv[2] = prompt

      // Act
      const cleanPrompt = await cliObj.getPrompt()
      const result = await serviceObj.sendPrompt({ prompt: cleanPrompt })

      // Assert
      expectTypeOf(result).toBeString()
    })
  })
})
