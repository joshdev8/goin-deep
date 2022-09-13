#!/usr/bin/env python3

import os
import json
import ast

# loop through the array of objects and create a new array of objects with the key being the filename and the value being the file contents
# example output [{filename: file contents}, {filename: file contents}]
# write the array of objects to a new file called all-transcripts.json


def write_to_file(transcripts):
    with open('public/content/all-transcripts.json', 'w') as f:
        f.write(str(transcripts))

# loop through directory of json files and create an array of objects with the key being the filename and the value being the file contents
# example output [{filename: file contents}, {filename: file contents}]
# return the array of objects


transcripts = []
for filename in os.listdir('public/content'):
    if filename.endswith('.json'):
        with open('public/content/' + filename) as f:
            data = f.read()

            cleaned_filename = filename.replace('.json', "")
            double_quoted_filename = '"' + cleaned_filename + '"'
            json_data = json.dumps(ast.literal_eval(data))

            # remove backslashes and forward slashes from json_data
            json_data = json_data.replace('\\', '')
            json_data = json_data.replace('/', '')
            # remove single quotes from json_data
            json_data = json_data.replace("'", '')

            # remove single quotes from double_quoted_filename
            double_quoted_filename = double_quoted_filename.replace("'", "")

            transcripts.append({double_quoted_filename: json_data})
            write_to_file(transcripts)
