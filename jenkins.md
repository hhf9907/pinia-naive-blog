``` shell 
docker run -d -u root -p 8080:8080 -p 50000:50000 -v /var/jenkins_home:/var/jenkins_home -v  /etc/localtime:/etc/localtime -v /var/run/docker.sock:/var/run/docker.sock   57d

```


docker stop vueblog || true \
 && docker rmi -f vueblog || true \
 && cd /home/pinia-naive-blog  \
 && docker build  -t vueblog  . \
 && docker run -d -p 80:80 --name vueblog 


管理员密码： bf236de80f6e43e58ced0e5df28360ac

#!/bin/bash

/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin




vim /etc/profile

export JAVA_HOME=/usr/lib/jvm/jre-1.8.0-openjdk
export JRE_HOME=$JAVA_HOME/jre
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=.:$JAVAHOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

//使配置文件生效
source /etc/profile 
source ~/.bash_profile 11.0.16.0.8
//或重启机器配置生效
reboot

[jenkins]
​
name=Jenkins-stable
​
baseurl=http://pkg.jenkins.io/redhat (把这里多出来的单词-stable删掉)
​
gpgcheck=1


sudo wget -O /etc/yum.repos.d/jenkins.repo http://jenkins-ci.org/redhat/jenkins.repo
