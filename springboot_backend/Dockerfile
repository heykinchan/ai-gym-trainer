# 使用 OpenJDK 17 镜像
FROM openjdk:17-jdk-alpine

# 复制构建后的 JAR 文件
COPY build/libs/demo-0.0.1-SNAPSHOT.jar app.jar

# 暴露 8080 端口
EXPOSE 8080

# 启动 Spring Boot 应用
ENTRYPOINT ["java", "-jar", "app.jar"]