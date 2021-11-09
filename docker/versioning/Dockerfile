FROM alpine:edge

RUN apk fix
RUN apk --update add git less openssh && \
    rm -rf /var/lib/apt/lists/* && \
    rm /var/cache/apk/*

COPY ./init /build/init
COPY ./cron /etc/cron.hourly/cron

ENTRYPOINT [ /build/init ]