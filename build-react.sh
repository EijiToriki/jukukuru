#!/usr/bin/env bash
docker-compose run --rm app sh -c "npm install -g create-react-app && create-react-app ."
echo "\nfinished create-react-app\n"
docker-compose run --rm app sh -c "npm install react-router-dom"
echo "\nfinished react-router-dom\n"
docker-compose run --rm app sh -c "yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion"