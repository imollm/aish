# AISH - Artificial Intelligence Shell Assistant

This assistant allows you to ask to AI for a specific shell command.

## Requirements
NodeJS >= 18.0.0
### OPENAI API KEY

You have to create an environment variable with the API key.

MacOS X
```sh
# To get a temporary env var
export OPENAI_API_KEY="<your_api_key_goes_here>"

# To get permanent env var
echo "\nexport OPENAI_API_KEY='<your_api_key_goes_here>'" >> ~/.bash_profile
source ~/.bash_profile
```

Windows
```
setx OPENAI_API_KEY "<your_api_key_goes_here>"
```

### Try the assistant
```sh
npx aish@latest <Here goes your prompt>
```
