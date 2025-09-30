#!/bin/bash
cd /home/kavia/workspace/code-generation/recipe-discover-and-share-26964-26973/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

