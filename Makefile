HTTPSERVE	   	?= ./node_modules/.bin/http-server
HTTPSERVE_PORT	?= 7080
NPX				?= ./node_modules/.bin/npx

.PHONY: serve
serve:
	$(HTTPSERVE) -p $(HTTPSERVE_PORT) -c-1

.PHONY: watchjs
watchjs:
	$(NPX)  webpack --mode=development  --watch
