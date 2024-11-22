const axios = require("axios");
const yaml = require("js-yaml");
const fs = require("fs");

// Input file validation
const inputFile = process.env['INPUT_FILE'];
if (!fs.existsSync(inputFile)) {
    console.error(`File <${inputFile}> does not exists. Exiting...`);
    process.exit(1);
}

// Loading configs
const yamlConfig = fs.readFileSync(`${inputFile}`);
const config = yaml.load(yamlConfig);
const { jira, user, worklog } = config;

for (const jiraItem of Object.keys(worklog)) {
    let itemWorklog = worklog[jiraItem];

    for (const date of Object.keys(itemWorklog)) {
        let data = {
            started: `${date}T08:00:00.000+0000`,
            timeSpent: `${itemWorklog[date]}`
        };

        let requestConfig = {
            method: "post",
            maxBodyLength: "Infinity",
            url: `${jira.protocol}://${jira.host}:${jira.port}${jira.urlSuffix}/rest/api/2/issue/${jiraItem}/worklog`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.jiraToken}`,
            },
            data: data
        };

        axios.request(requestConfig)
            .then((response) => {
                console.log(`Logging at ${jiraItem} => Date: ${data.started} | Hours: ${data.timeSpent}`);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}