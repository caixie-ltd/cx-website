FROM abiosoft/caddy:0.15.0

ADD ./Caddyfile /etc/Caddyfile
ADD ./public/* /serve/
