FROM scjoyedu.eicp.net:51300/dxg/zyframework-core-front-deploy-server
VOLUME /tmp
RUN mkdir -p /opt/app/install \
 && mkdir -p /opt/app/ext \
 && mkdir -p /opt/app/deploy \
 && mkdir -p /opt/app/backup
COPY app.tar.gz /opt/app/install
