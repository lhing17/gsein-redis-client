# Gsein Redis Client

Gsein redis client (GRC) is a new redis client GUI tool built with Electron, Vue, Spring Boot, and Lettuce.

Here are some basic features of GRC:

- Keys viewing/editing
- Cheatsheet for redis commands  
- Test if a connection is valid.  
-  
- Terminal (TODO)
- SSH / Cluster support (TODO)
- Sync data from different databases (TODO)

Note: GRC only supports Redis >= 2.8 version because we use SCAN command to load keys.

## Techs

- GUI: Electron + Vue
- Function Implementation: Spring Boot + Lettuce (Kotlin)

## Build Steps

1. Install dependencies for electron

For MacOS and linux,

```shell
    ./gradlew setupNode
```

For windows,

```cmd
    gradlew.bat setupNode
```

2. Build

For MacOS and linux,

```shell
    ./gradlew buildApp
```

For windows,

```cmd
    gradlew.bat setupNode
```

3. Run

For MacOS and linux,

```shell
    ./gradlew runApp
```

For windows,

```cmd
    gradlew.bat setupNode
```

4. Package

For MacOS and linux,

```shell
    ./gradlew bunaleApp
    
```

For windows,

```cmd
    gradlew.bat setupNode
```

## Contribute / Sponsor

- Simply star this repo :)
- Feature requests and issues are welcome.
- Feel free to check issues page
