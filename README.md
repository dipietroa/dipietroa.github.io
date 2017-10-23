# [TWEB PROJECTS - GITANALYTICS](https://dipietroa.github.io)

## What is GitAnalytics

GitAnalytics is a website that provides some analyses of pull requests in GitHub. It uses the GitHub API to fetch data and show some stats over it.


## Components

### You need 3 different components to run it localy
#### The WebSite 
Is the UI, you can find the sources in the current repository

#### [The Agent](https://github.com/dipietroa/tweb_agent)

It fetches data from the GitHub API and generate results files containing some PR stats in a given repository.

#### [The API Rest](https://github.com/dipietroa/tweb_apirest)

It allows a user to add a repository to analyze, by updating an online config file

## Usage

Download the 3 components and follow the basic usage guideline

### Basic Usage

After downloading you have to edit some files to make it work "locally" (the agent and the rest api have to update files on github).

In the API rest (runs on port 3000 locally):
- ./routes/routes.js at line 65 : Change the location of the config.json file (it has to be in a generated_files folder located at the root of your website folder)
- ./github-crendentials.json : Add your username and a valid github token (generate it from GitHub Website)

In the Agent:
- ./src/agent.js at line 29 : Change the destination repository, is the repository of your website.
- ./github-crendentials.json : Add your username and a valid github token (generate it from GitHub Website)

In the UI (WebSite):
- ./js/addpr.js at line 26 : The URL to contact your API rest. Let the /addpr at the end of the URL