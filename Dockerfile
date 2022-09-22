FROM nginx:latest

# 维护者信息
MAINTAINER 1399859803@qq.com


# 将项目根目录下dist文件夹下的所有文件复制到镜像中 /usr/share/nginx/html/ 目录下
COPY dist/ /usr/share/nginx/html/
COPY docker/default.conf /etc/nginx/conf.d/default.conf

COPY ssl/ /etc/nginx/ssl
