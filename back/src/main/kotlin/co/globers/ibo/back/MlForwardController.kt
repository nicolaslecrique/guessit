package co.globers.ibo.back

import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.util.*


@RestController
class MlForwardController(private val mlRestService: MlRestService) {

    data class ComputeGuessQueryBody(val uri: String, val description_sentences: List<String>)

    @PostMapping("/compute_guesses", consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun computeGuesses(@RequestBody query: ComputeGuessQueryBody): MlRestService.GuessEntityReply {
        return mlRestService.computeGuesses(query.uri, query.description_sentences)
    }

}
