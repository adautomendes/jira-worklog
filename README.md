# Jira Worklog Rest-Batch

A docker image to batch worklogs on Jira cards.

## How to configure

Create a `yaml` file with the following information:

```yaml
jira:
  protocol: [http|https]
  host: <host of Jira instance>
  port: <port of Jira instance>
  urlSuffix: <set this value if there is any suffix in Jira URL, e.g., /jira>
user:
  login: <your Jira user>
  jiraToken: <your Jira token, see below>
worklog:
  "<Jira card 1>":
    "<date in format YYYY-MM-dd>": "<time spent in that date, format: Xh>"
    "<date in format YYYY-MM-dd>": "<time spent in that date, format: Xh>"
    "<date in format YYYY-MM-dd>": "<time spent in that date, format: Xh>"
  "<Jira card 2>":
    "<date in format YYYY-MM-dd>": "<time spent in that date, format: Xh>"
    "<date in format YYYY-MM-dd>": "<time spent in that date, format: Xh>"
    "<date in format YYYY-MM-dd>": "<time spent in that date, format: Xh>"
```

See example below:

```yaml
jira:
  protocol: "http"
  host: "localhost"
  port: "8080"
  urlSuffix: "/jira"
user:
  login: "adautomendes"
  jiraToken: "my_jira_token"
worklog:
  "JIRA-1234":
    "2000-01-01": "1h"
    "2000-01-02": "2h"
    "2000-01-03": "3h"
```

To learn how create access tokens on Jira please check [Using Personal Access Tokens](https://confluence.atlassian.com/enterprise/using-personal-access-tokens-1026032365.html).

## How to run using docker

- Create your config `yaml` file:

```shell
cd ~
touch config.yaml
```

- Fill the information needed in `config.yaml`.
- Run the docker image setting the config file path as environment variable `INPUT_FILE`:

```shell
docker run -v ~:/input -e INPUT_FILE=/input/config.yaml --rm adautomendes/jira-worklog
```