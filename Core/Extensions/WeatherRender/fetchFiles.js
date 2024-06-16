const axios = require('axios');
const cheerio = require('cheerio');

// URL to fetch the list of files
const url = 'https://radar.weather.gov/ridge/standard/';

// Fetch the list of files
axios.get(url)
    .then(response => {
        const $ = cheerio.load(response.data);
        const files = [];

        // Extract filenames (assuming they're in <a> tags)
        $('a').each((index, element) => {
            const fileName = $(element).attr('href');
            if (fileName.endsWith('.gif')) {
                files.push(fileName);
            }
        });

        // Example processing function
        const processFile = (filePath) => {
            axios.head(filePath)
                .then(response => {
                    console.log(`File: ${filePath}, Size: ${response.headers['content-length']} bytes`);
                })
                .catch(error => {
                    console.log(`File: ${filePath} does not exist`);
                });
        };

        // Process each file
        files.forEach(file => {
            processFile(url + file);
        });

        // Example usage: Access a specific file
        const accessSpecificFile = (filename) => {
            if (files.includes(filename)) {
                processFile(url + filename);
            } else {
                console.log(`File ${filename} not found in the list.`);
            }
        };

        // Example usage: Access a specific file
        accessSpecificFile('KFTW_0.gif');

    })
    .catch(error => {
        console.error(`Error fetching the file list: ${error}`);
    });
