import org.jetbrains.compose.compose
import org.jetbrains.compose.desktop.application.dsl.TargetFormat
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.4.30"
    id("org.jetbrains.compose") version "0.3.0"
    id("org.springframework.boot") version "2.4.2"
}

group = "cn.gsein"
version = "1.0.0"

tasks {
    bootJar {
        archiveFileName.set("app.jar")
        mainClassName = "cn.gsein.redisclient.RedisClientKt"
    }
}

repositories {
    jcenter()
    mavenCentral()
    maven { url = uri("https://maven.pkg.jetbrains.space/public/p/compose/dev") }
}

dependencies {
    implementation(compose.desktop.currentOs)
    implementation("org.springframework.boot:spring-boot-starter-data-redis:2.4.2")
    implementation("org.springframework.boot:spring-boot-starter-web:2.4.2")
    implementation("org.apache.commons:commons-pool2:2.6.0")
    implementation("com.alibaba:fastjson:1.2.73")
}

tasks.withType<KotlinCompile>() {
    kotlinOptions.jvmTarget = "11"
}

compose.desktop {
    application {
        mainClass = "MainKt"
        nativeDistributions {
            targetFormats(TargetFormat.Dmg, TargetFormat.Msi, TargetFormat.Deb)
            packageName = "redis-client"
        }
    }
}

val compileKotlin: KotlinCompile by tasks
compileKotlin.kotlinOptions {
    languageVersion = "1.4"
}