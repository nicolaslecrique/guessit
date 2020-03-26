import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.2.5.RELEASE"
	id("io.spring.dependency-management") version "1.0.9.RELEASE"
	kotlin("jvm") version "1.3.61"
	kotlin("plugin.spring") version "1.3.61"

	// https://github.com/etiennestuder/gradle-jooq-plugin
	id("nu.studer.jooq")
}


group = "co.globers.ibo"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_1_8

val developmentOnly by configurations.creating
configurations {
	runtimeClasspath {
		extendsFrom(developmentOnly)
	}
}

repositories {
	mavenCentral()
}

dependencies {

	// default dependencies from spring boot initializer
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	testImplementation("org.springframework.boot:spring-boot-starter-test") {
		exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
	}

	// Mysql / Jooq
	// https://github.com/etiennestuder/gradle-jooq-plugin
	implementation("mysql:mysql-connector-java:8.0.19")
	jooqRuntime("mysql:mysql-connector-java:8.0.19")
	implementation("org.jooq:jooq:3.13.1")
}

jooq {
	version = "3.13.1"
	edition = nu.studer.gradle.jooq.JooqEdition.OSS
	generateSchemaSourceOnCompilation = true
	// https://github.com/etiennestuder/gradle-jooq-plugin#defining-the-jooq-version-when-the-spring-boot-plugin-is-applied
	ext["jooq.version"] = "3.13.1"

	// to generate code from db: gradle generateSampleJooqSchemaSource
	"ibo"(sourceSets["main"]) {
		jdbc {
			driver = "com.mysql.cj.jdbc.Driver"
			url = "jdbc:mysql://localhost:3306/ibo"
			user = "root"
			password = "ibo-db-root-pwd"
		}
		generator {
			name = "org.jooq.codegen.DefaultGenerator"
			database {
				name = "org.jooq.meta.mysql.MySQLDatabase"
				inputSchema = "ibo"
				includes = ".*"
				excludes = ""
			}
			generate {
				isDeprecated = false
				isRecords = false
				isImmutablePojos = false
				isFluentSetters = false
			}
			target {
				packageName = "co.globers.ibo.jooq"
			}
			strategy {
				name = "org.jooq.codegen.DefaultGeneratorStrategy"
			}
		}
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "1.8"
	}
}
