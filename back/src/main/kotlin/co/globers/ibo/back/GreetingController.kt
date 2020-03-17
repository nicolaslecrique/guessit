package co.globers.ibo.back

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

data class Greeting(val field: String = "Hello from backend")

@RestController
class GreetingController {

    @GetMapping("/")
    fun greeting(): Greeting {
        return Greeting()
    }

}
