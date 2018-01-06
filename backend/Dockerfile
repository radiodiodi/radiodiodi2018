FROM node:9.3.0

RUN mkdir /app
ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock
WORKDIR /app

# Install yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash