import org.jetbrains.kotlin.gradle.tasks.KotlinCompile


plugins {
    kotlin("jvm") version "1.4.30"
//    id("org.jetbrains.compose") version "0.3.0"
    id("org.springframework.boot") version "2.4.2"
    id("com.moowork.node") version "1.3.1"
    id("application")
}

val kotlinVersion: String = "1.4.30"
group = "cn.gsein"
version = "1.0.0"

tasks {
    bootJar {
        archiveFileName.set("app.jar")
    }

    build {
        dependsOn("buildApp")
    }

    bootStartScripts {
        (unixStartScriptGenerator as TemplateBasedScriptGenerator).template = resources.text.fromFile("customUnixStartScript.txt")
        (windowsStartScriptGenerator as TemplateBasedScriptGenerator).template = resources.text.fromFile("customWindowsStartScript.txt")
    }
}

task("setupNode") {
    group = "build"
    dependsOn("npm_install")
}

task("buildApp") {
    group = "build"
    dependsOn("installBootDist")
    doLast {
        val targetDir = project.file("src/main/electron/redis-electron/public")


        val runtimeDir = File(targetDir, "runtime")
        if (runtimeDir.exists()) {
            runtimeDir.delete()
        }
        runtimeDir.mkdir()


        copy {
            from(File(System.getProperty("java.home"), "jre"))
            into(runtimeDir)
        }

        copy {
            from(project.file("build/install/redis-client-boot"))
            into(targetDir)
        }

        val osName = System.getProperty("os.name").toLowerCase()
        val isWindows = osName.contains("windows")

        val appFile = File(targetDir, "bin/redis-client")
        if (!isWindows) {
            exec {
                commandLine("chmod", "+x", appFile.absolutePath)
                commandLine("chmod", "-R", "755", runtimeDir.absolutePath)
            }
        }
    }
}

task("runApp") {
    group = "debug"
    dependsOn("buildApp")

    doLast {
        val osName = System.getProperty("os.name").toLowerCase()
        val isWindows = osName.contains("windows")

        exec {
            workingDir("src/main/electron/redis-electron")
            if (isWindows) {
                setExecutable(File(workingDir, "node_modules/.bin/vue-cli-service.cmd"))
                args("electron:serve")
            } else {
                setExecutable(File(workingDir, "node_modules/.bin/vue-cli-service"))
                args("electron:serve")
            }
        }
    }

}

task("bundleApp") {
    group = "build"
    dependsOn("buildApp")

    outputs.dir(project.file("build/bundle"))


    doLast {

        val osName = System.getProperty("os.name").toLowerCase()
        val isWindows = osName.contains("windows")
        val isMacOS = osName.contains("darwin")

        val nodeDir = if (isWindows) File("node") else File("node", "bin")

        exec {
            workingDir("src/main/electron/redis-electron")
            when {
                isWindows -> {
                    setExecutable(File(workingDir, "node_modules/.bin/vue-cli-service.cmd"))
                    args("electron:build")
                }
                isMacOS -> {
                    setExecutable(File(workingDir, "node_modules/.bin/vue-cli-service"))
                    args("electron:build")
                }
                else -> {
                    setExecutable(File(workingDir, "node_modules/.bin/vue-cli-service"))
                    args("electron:build")
                }
            }

        }


    }
}



node {
    nodeModulesDir = project.file("src/main/electron/redis-electron")
}


repositories {
    jcenter()
    mavenCentral()
    maven { url = uri("https://maven.pkg.jetbrains.space/public/p/compose/dev") }
}


dependencies {
    implementation("org.projectlombok:lombok:1.18.16")
    compileOnly("org.gradle:gradle-tooling-api:2.13")
    implementation("org.springframework.boot:spring-boot-starter-data-redis:2.4.2")
    implementation("org.springframework.boot:spring-boot-starter-web:2.4.2")
    implementation("org.apache.commons:commons-pool2:2.6.0")
    implementation("com.alibaba:fastjson:1.2.73")
    implementation("org.jetbrains.kotlin:kotlin-reflect:$kotlinVersion")

}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "11"
}


val compileKotlin: KotlinCompile by tasks
compileKotlin.kotlinOptions {
    languageVersion = "1.4"
}
