FROM icr.io/appcafe/open-liberty:kernel-slim-java17-openj9-ubi

# Add config
COPY --chown=1001:0  target/liberty/wlp/usr/servers/dicerollparser/server.xml /config/
COPY --chown=1001:0  target/liberty/wlp/usr/servers/dicerollparser/configDropins/overrides /config/configDropins/overrides
COPY --chown=1001:0  target/dicerollparser-rest.war /config/apps/

RUN features.sh

# This script will add the requested server configurations, apply any interim fixes and populate caches to optimize runtime
RUN configure.sh
