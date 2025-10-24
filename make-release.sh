#!/bin/bash

OUTPUT_FILE="./release_v1.$(date +%y\.%m\.%d%H).zip"

git archive --format=zip --output="${OUTPUT_FILE}" HEAD

if [ $? -eq 0 ]; then
    echo ""
    echo "Success!";
    echo "OUTPUT FILE: ${OUTPUT_FILE}";
else
    echo ""
    echo "Error on create release."
    exit 5;
fi
