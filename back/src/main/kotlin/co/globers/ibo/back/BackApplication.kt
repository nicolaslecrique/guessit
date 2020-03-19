package co.globers.ibo.back

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class BackApplication

fun main(args: Array<String>) {
	runApplication<BackApplication>(*args)
}


// TODO: Faire en sorte d'utiliser la variable d'env PORT pour là ou écoute le process (plutot que 8080 par défaut)

// TODO: 1) servir une route hello-world   2) faire un docker        3 ) script deployement cloud run
