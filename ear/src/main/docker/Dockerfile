FROM icr.io/appcafe/open-liberty:kernel-slim-java17-openj9-ubi

COPY --chown=1001:0 maven/config/ /config/
COPY --chown=1001:0 maven/*.ear /config/apps/

ENV APP_FILENAME=${app.filename}
ENV APP_CONTEXT_ROOT=${app.context.root}
ENV OPENJ9_SCC=true
RUN features.sh
RUN configure.sh
