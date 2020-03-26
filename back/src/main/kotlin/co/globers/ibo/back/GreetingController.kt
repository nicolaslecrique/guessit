package co.globers.ibo.back

import co.globers.ibo.back.db.Db
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

data class Greeting(val field: String = "Hello from backend")

data class EntitiesToGuess(val entities: Map<String, String>)

@RestController
class GreetingController(private val db: Db) {

    @GetMapping("/")
    fun greeting(): Greeting {
        return Greeting()
    }

    @GetMapping("/entities_to_guess")
    fun entitiesToGuess() = EntitiesToGuess(db.getEntitiesToGuess().map { it.uri to it.name }.toMap())

}
