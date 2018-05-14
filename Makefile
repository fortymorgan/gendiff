install:
	npm install

publish:
	npm publish

lint:
	npm run eslint

start:
	npm run babel-node -- src/bin/brain-games.js