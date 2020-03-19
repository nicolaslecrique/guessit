package co.globers.ibo.back

import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.util.*


@RestController
class MlForwardController(private val mlRestService: MlRestService) {

    data class ComputeGuessQueryBody(val description_sentences: List<String>)

    @PostMapping("/compute_guesses", consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun computeGuesses(@RequestBody query: ComputeGuessQueryBody): Map<String, Double> {
        return mlRestService.computeGuesses(query.description_sentences)
    }

}
