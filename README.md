# docker-rwss-trial
This project is for web-gis trial version of Water and Sanitation Cooporation(WASAC) in Rwanda. This repository was created by JICA RWASOM project second phase.
This docker-compose does not include PostgreSQL/PostGIS.
You must install PostGIS outside of docker container. Docker container will access to PostGIS on host computer by  "host.docker.internal" as host name.

If you changed source code of Web-GIS application under webapp folder, please use eclipse to make rural.war file under build folder. ./webapp/rural.war file will bind to tomcat webapps folder.
