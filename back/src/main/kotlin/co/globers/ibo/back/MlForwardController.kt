package co.globers.ibo.back

import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono
import java.util.*

@CrossOrigin
@RestController
class MlForwardController(private val mlRestService: MlRestService) {

    data class ComputeGuessQueryBody(val entity_to_guess_uri: String, val description_sentences: List<String>)
    data class ComputeGuessReply(val guesses: Map<String, Double>)

    @PostMapping("/compute_guesses", consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun computeGuesses(@RequestBody query: ComputeGuessQueryBody): Mono<ComputeGuessReply> {
        return mlRestService
                .computeGuesses(query.entity_to_guess_uri, query.description_sentences)
                .map { ComputeGuessReply(it) }
    }
}
