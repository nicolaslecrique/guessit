package co.globers.ibo.back

import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class MlRestService(iboConfig: IboConfig) {

    private val mlClient = WebClient.create(iboConfig.ml_service.url)

    // api specifications, do not rename
    data class GuessEntityQuery(val entity_to_guess_uri: String, val description_sentences: List<String>)
    data class GuessEntityReply(val guesses: Map<String, Double>)

    fun computeGuesses(entityToGuessUri:String, descriptionSentences: List<String>): Map<String, Double> {

        return  mlClient
                .post()
                .uri("/guess_entity")
                .bodyValue(GuessEntityQuery(entityToGuessUri, descriptionSentences))
                .retrieve()
                .bodyToMono(GuessEntityReply::class.java)
                .map { it.guesses }
                .block()!!
    }

}
