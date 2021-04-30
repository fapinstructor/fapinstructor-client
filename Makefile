.PHONY: start start-chrome

dev:
	yarn start

start-chrome:
	/usr/bin/google-chrome-stable \
		 --remote-debugging-port=9222 \
		 --user-data-dir=/tmp/fapinstructor-userdatadir \
		 --no-default-browser-check http://localhost:3000 &
		 