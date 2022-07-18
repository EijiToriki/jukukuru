FROM node:17-alpine
WORKDIR /usr/app

RUN npm install -g create-react-app && create-react-app .
RUN npm install react-router-dom
RUN npm install axios
RUN yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion