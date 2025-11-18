#!/usr/bin/env bash
file="$1";
declare -a keys;

# Get the api keys
function get_keys() {
    line_number=0;
    while read line; do
        keys[line_number]="$line";
        line_number+=1;
    done < "$file"
}

# Setup the environment variables based on the keys found in the passed file
function setup_env() {
    if [ ${#keys[0]} -gt ${#keys[1]} ]; then
        export TELEGRAM_BOT_KEY=${keys[0]};
        export E621_API_KEY=${keys[1]};
    else
        export TELEGRAM_BOT_KEY=${keys[1]};
        export E621_API_KEY=${keys[0]};
    fi
}

# Get keys
get_keys;

# Setup the environment variables
setup_env;

# Run the bot
deno run dev;